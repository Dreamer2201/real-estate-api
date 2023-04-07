const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid')

const {registerSchema} = require('../../shemas/index')
const User = require('../../models/user')
const {HttpError, sendEmail} = require('../../helpers/index')

const saltRounds = 10;

const registerUser = async (req, res, next) => {
    try {
        const {error} = registerSchema.validate(req.body)
        if(error) {
            throw HttpError(400, "missing requires name field")
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (user) {
            throw HttpError(409, "Email in use")
        }
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const avatar = gravatar.url(email);

        const verificationToken = nanoid()

        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarUrl: avatar,
            verificationToken,
        })

        const mail = {
            to: email,
            subject: "Submit your registration",
            html: `<a href="http://localhost:4000/api/users/verify/${verificationToken}" target="_blank">Submit your register</a>`
        }

        await sendEmail(mail)

        res.status(201).json({
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    subscription: newUser.subscription,
                    avatarUrl: avatar,
                    verificationToken,
                }
        })
    }
    catch(error) {
        next(error)
      }
}

module.exports = registerUser