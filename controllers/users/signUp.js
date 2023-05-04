const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const {nanoid} = require('nanoid')

const {registerSchema} = require('../../shemas/index')
const User = require('../../models/user')
const {HttpError, sendEmail} = require('../../helpers/index')
// const {SECRET_KEY} = process.env

const saltRounds = 10;

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

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

        const token = signToken(newUser.id);
        newUser.token = token;
        newUser.save();

        const mail = {
            to: email,
            subject: "Submit your registration",
            html: `<a href="http://localhost:3000" target="_blank">Submit your register</a>`
        }

        await sendEmail(mail)

        res.status(201).json({
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    subscription: newUser.subscription,
                    avatarUrl: avatar,
                    verificationToken,
                    token,
                }
        })
    }
    catch(error) {
        next(error)
      }
}

module.exports = registerUser