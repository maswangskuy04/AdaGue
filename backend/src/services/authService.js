const { Op } = require("sequelize");
const { User, Match } = require("../models");
const { generateToken } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/password");
const { sendOtpEmail } = require("./emailService");
const generateOtp = require("../utils/generateOtp");

class AuthService {
    static async register({ fullname, email, password }) {
        const exists = await User.findOne({ where: { email } })
        if (exists) {
            throw { status: 400, message: 'Email already registered' }
        }

        const otp = generateOtp()

        await User.create({
            fullname,
            email,
            password: await hashPassword(password),
            isVerified: false,
            emailOtp: otp,
            emailOtpExpiredAt: new Date(Date.now() + 10 * 60 * 1000)
        })

        await sendOtpEmail(email, otp)

        return { message: "OTP code has been successfully sent" }
    }

    static async login({ email, password }) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw { status: 401, message: 'Invalid email or password' }
        }

        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            throw { status: 401, message: 'Invalid email or password' }
        }

        if (!user.isVerified) {
            throw { status: 403, message: 'Please verify your email first' }
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            roles: user.roles
        })

        return {
            accessToken: token,
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname
            }
        }
    }

    static async verifyOtp({ email, otp }) {
        const user = await User.findOne({
            where: {
                email,
                emailOtp: otp,
                emailOtpExpiredAt: {
                    [Op.gt]: new Date()
                }
            }
        })

        if (!user) {
            throw { status: 400, message: "OTP is incorrect or has expired" }
        }

        user.isVerified = true
        user.emailOtp = null
        user.emailOtpExpiredAt = null
        
        await user.save()

        return { message: "Email successfully verified" }
    }

    static async me(userId) {
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            }
        })

        if (!user) {
            throw { status: 404, message: "User not found" }
        }

        const activeMatch = await Match.findOne({
            where: {
                status: 'active',
                [Op.or]: [
                    { userAId: userId },
                    { userBId: userId }
                ]
            },
            attributes: ['id']
        })

        const matchId = activeMatch ? activeMatch.id : null

        return {
            ...user.toJSON(),
            activeMatch: matchId
        }
    }
}

module.exports = AuthService