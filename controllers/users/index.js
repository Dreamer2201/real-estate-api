const registerUser = require('./signUp')
const loginUser = require('./login')
const verifyEmail = require('./verifyEmail')
const resendVerify = require('./resendVerify')
const logout = require('./logout')

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerify,
    logout,
    
}
