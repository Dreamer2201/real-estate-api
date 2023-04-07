const express = require("express")
const ctrl = require('../../controllers/users/index')
const authenticate = require('../../middlewares/authenticate')

const router = express.Router()

router.post('/register', ctrl.registerUser)
router.get('/verify/:verificationToken', ctrl.verifyEmail)
router.post('/verify', ctrl.resendVerify)
router.post('/login', ctrl.loginUser)
router.post('/logout', authenticate, ctrl.logout)
// router.post('/current', authenticate, ctrl.postCurrent)
// router.post('/logout', ctrl.logoutUser)
// router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router