const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendOtpEmail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your Verification Code',
        html: `
            <h3>Email Verification</h3>
            <p>OTP Code:</p>
            <h1>${otp}</h1>
            <p>Berlaku 10 menit</p>
        `
    })
}

module.exports = { sendOtpEmail }