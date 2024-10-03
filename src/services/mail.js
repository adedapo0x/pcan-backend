const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    }
})

const sendEmail = async (name, email, message) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Website Form Submission From ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Message sent: ", info.response)
        return info
    } catch (e){
        console.log("Error encountered: ", e)
        throw e
    }
}


module.exports = sendEmail
