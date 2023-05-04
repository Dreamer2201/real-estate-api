const registerUser = require('./signUp')
const loginUser = require('./login')
const verifyEmail = require('./verifyEmail')
const resendVerify = require('./resendVerify')
const logout = require('./logout')
const postCurrent = require('./currentUser')
module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerify,
    logout,
    postCurrent,
}
