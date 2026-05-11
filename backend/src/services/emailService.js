const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendOtpEmail = async (to, otp) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
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