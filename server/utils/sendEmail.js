const nodemailer = require('nodemailer');

module.exports = async (email, subject, data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            // text: text
            html: data
        })
        console.log("Email gửi thành công");
    } catch (error) {
        console.log("Email gửi không thành công");
        console.log(error.message);
    }
}