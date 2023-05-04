const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {loginSchema} = require('../../shemas/index')
const User = require('../../models/user')
const {HttpError} = require('../../helpers/index')
const { use } = require('../../routes/api/auth')

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
 
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
        const token = signToken(user.id);
        
        await User.findByIdAndUpdate(user._id, {token})

        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                token: user.token,
                }
        })
    }
    catch(error) {
        next(error)
      }
}

module.exports = loginUser