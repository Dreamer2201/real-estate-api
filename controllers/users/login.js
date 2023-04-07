const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {loginSchema} = require('../../shemas/index')
const User = require('../../models/user')
const {HttpError} = require('../../helpers/index')

const {SECRET_KEY} = process.env
 
const loginUser = async (req, res, next) => {
    try {
        const {error} = loginSchema.validate(req.body)
        if(error) {
            throw HttpError(400, "missing requires name field")
        }
        const {email, password} = req.body

        const user = await User.findOne({email})
        const comparePassword = await bcrypt.compare(password, user.password)
        
        if(!user || !comparePassword) {
            throw HttpError(401, "Email or password is invalid")
        }

        if(!user.verify) {
            throw HttpError(400, "Email not verify")
        }
        
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})

        await User.findByIdAndUpdate(user._id, {token})

        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                }
        })
    }
    catch(error) {
        next(error)
      }
}

module.exports = loginUser