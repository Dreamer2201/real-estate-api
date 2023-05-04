const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {HttpError} = require('../helpers/index')

const {JWT_SECRET} = process.env

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers
    const [bearer, token] = authorization.split(" ")

    if(bearer !== "Bearer") {
        next(HttpError(401))
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decodedToken.id)
        if(!user || !user.token) {
            next(HttpError(401))
        }
        req.user = user
        next()
    }
    catch(err) {
       next(err)
    }
}

module.exports = authenticate