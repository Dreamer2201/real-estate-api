const User = require('../../models/user')
const {verifyEmailSchema} = require('../../shemas/index')
const {HttpError, sendEmail} = require('../../helpers/index')


const resendVerify = async (req, res, next) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})

        const {error} = verifyEmailSchema.validate(req.body)
        if(error) {
            throw HttpError(400, "missing required field email")
        }

        if(!user) {
            throw HttpError(404, `Not found user with email ${email}`)
        }
        if(user.verify) {
            throw HttpError(400, "Verification has already been passed")
        }

        const mail = {
            to: email,
            subject: "Submit your registration",
            html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Submit your register</a>`
        }

        await sendEmail(mail)

        res.status(200).json({
            message: "Verification email sent"
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports = resendVerify