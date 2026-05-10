const { Op } = require("sequelize");
const { Match, User, Conversation } = require("../models");

class UserService {
    static async getActiveMatch(userId) {
        const match = await Match.findOne({
            where: {
                status: 'active',
                [Op.or]: [
                    { userAId: userId },
                    { userBId: userId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'userA',
                    attributes: ['id', 'fullname', 'presence', 'lastSeenAt']
                },
                {
                    model: User,
                    as: 'userB',
                    attributes: ['id', 'fullname', 'presence', 'lastSeenAt']
                }
            ]
        })

        if (!match) return null

        // tentukan partner
        const partner = match.userAId === userId ? match.userB : match.userA

        const conversation = await Conversation.findOne({
            where: {
                matchId: match.id
            }
        })

        return {
            matchId: match.id,
            status: match.status,
            conversationId: conversation.id,
            partner
        }
    }

    static async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: [
                'id',
                'fullname',
                'email',
                'roles',
                'avatar',
                'isActive',
                'chatStatus',
                'isVerified',
                'createdAt',
                'updatedAt'
            ]
        })

        if (!user) if (!user) throw new Error('User not found')

        return user
    }
}

module.exports = UserService