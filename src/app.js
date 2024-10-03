const express = require('express')
const cors = require('cors')
const contactUs = require('./controller/contact.controller')
const { body } = require('express-validator')
const rateLimit = require('express-rate-limit')

const app = express()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            status: options.statusCode,
            error: 'Too many requests',
            message: options.message,
            retryAfter: Math.ceil(options.windowMs / 1000)
        })
    }
})

app.use(cors())
app.use('/contact-us', limiter)
app.use(express.json())

app.post('/contact-us', [
    body(   'name').notEmpty().trim().isLength({min: 3, max: 30}).withMessage("Full name is required"),
    body('email').isEmail().withMessage("Invalid email address"),
    body('message').notEmpty().withMessage("Message required").isLength({min:6}).withMessage("Message too short")

],contactUs)


module.exports = app
