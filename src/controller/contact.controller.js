const { validationResult } = require('express-validator')
const sendEmail = require('../services/mail')

const contactUs =  async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }
        const { name, email, message } = req.body
        const result = await sendEmail(name, email , message)

        return res.json({ status: "success", message: "Email sent successfully" })
    } catch (err){
        console.log(err)
        return res.status(400).json({message: "Message not sent. Please try again"})
    }
}

module.exports = contactUs