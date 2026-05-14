const { Resend } = require("resend");

// Kirim OTP email via Resend (gratis tier)
// Env yang diperlukan:
// - RESEND_API_KEY
// - RESEND_FROM_EMAIL (email sender yang sudah di-verify di Resend)
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (to, otp) => {
    const from = process.env.RESEND_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY) {
        throw new Error("Missing RESEND_API_KEY");
    }

    if (!from) {
        throw new Error("Missing RESEND_FROM_EMAIL");
    }

    const html = `
<html>

<body style="font-family: Arial, sans-serif;">
  <h2>Verification Code</h2>
  <p>Halo,</p>
  <p>Kode OTP kamu adalah: <strong style="font-size: 1.5rem; color: #007bff;">${otp}</strong></p>
  <p>Kode ini berlaku selama 10 menit.</p>
</body>

</html>
`;

    try {
        const { data, error } = await resend.emails.send({
            from,
            to: [to],
            subject: "Your Verification Code",
            html,
        });

        if (error) throw error;

        console.log("✅ OTP EMAIL SENT. ID:", data?.id);
        return data;
    } catch (err) {
        console.error("❌ RESEND EMAIL ERROR:", err?.response || err);
        throw err;
    }
};

module.exports = { sendOtpEmail };
