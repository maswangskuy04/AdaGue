const { Op } = require("sequelize")
const sequelize = require("../config/db")
const { User, Match, Conversation } = require("../models")

class MatchService {
    static async startSearching(userId) {
        return sequelize.transaction(async (t) => {
            const user = await User.findByPk(userId, {
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!user) throw new Error('User not found');

            if (user.chatStatus === 'matched') {
                throw new Error('User still in match')
            }

            if (user.chatStatus === 'searching') {
                return { status: 'waiting', message: 'Already searching' }
            }

            const partner = await User.findOne({
                where: {
                    chatStatus: 'searching',
                    id: {
                        [Op.ne]: userId
                    }
                },
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!partner) {
                await user.update({ chatStatus: 'searching' }, { transaction: t })
                return { status: 'waiting', message: 'Waiting for partner' }
            }

            const match = await Match.create({
                userAId: user.id,
                userBId: partner.id,
                status: 'active'
            }, {
                transaction: t
            })

            const conversation = await Conversation.create({
                matchId: match.id
            }, {
                transaction: t
            })

            await match.update({
                conversationId: conversation.id
            }, {
                transaction: t
            })

            await User.update({
                chatStatus: 'matched',
                activeMatchId: match.id
            }, {
                where: {
                    id: [user.id, partner.id]
                },
                transaction: t
            })

            return {
                status: 'matched',
                matchId: match.id,
                conversationId: conversation.id,
                partner: {
                    id: partner.id,
                    fullname: partner.fullname
                }
            }
        })
    }

    static async endMatch(userId) {
        return sequelize.transaction(async (t) => {
            const match = await Match.findOne({
                where: {
                    status: 'active',
                    [Op.or]: [
                        { userAId: userId },
                        { userBId: userId }
                    ]
                },
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!match) return null

            const partnerId = match.userAId === userId ? match.userBId : match.userAId

            await User.update({
                chatStatus: 'idle',
                activeMatchId: null
            }, {
                where: {
                    id: [match.userAId, match.userBId]
                },
                transaction: t
            })

            await match.update({
                status: 'ended',
                endedAt: new Date()
            }, {
                transaction: t
            })

            return {
                partnerId
            }
        })
    }

    static async cancelSearching(userId) {
        await User.update({
            chatStatus: 'idle',
            activeMatchId: null
        }, {
            where: {
                id: userId
            }
        })

        return {
            message: 'Search canceled'
        }
    }

    static async getAllMatches(query = {}) {
        const { status, page = 1, limit = 10 } = query

        const where = {}

        if (status) {
            where.status = status
        }

        const offset = (page - 1) * limit

        const { count, rows } = await Match.findAndCountAll({
            distinct: true,
            where,
            include: [
                {
                    model: User,
                    as: 'userA',
                    required: false,
                    paranoid: false,
                    attributes: [
                        'id',
                        'fullname',
                        'avatar',
                        'isVerified'
                    ]
                },
                {
                    model: User,
                    as: 'userB',
                    required: false,
                    paranoid: false,
                    attributes: [
                        'id',
                        'fullname',
                        'avatar',
                        'isVerified'
                    ]
                },
                {
                    model: Conversation,
                    as: 'conversation',
                    required: false,
                    paranoid: false,
                    attributes: [
                        'id',
                        'createdAt',
                        'deletedAt'
                    ]
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: Number(limit),
            offset: Number(offset)
        })

        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            items: rows
        }
    }
}

module.exports = MatchService