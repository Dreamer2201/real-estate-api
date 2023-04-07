const express = require("express")
const {upload} = require('../../middlewares/index')
const ctrl = require('../../controllers/news/index')
// const authenticate = require('../../middlewares/authenticate')

const router = express.Router()

router.post('/', upload.single('cover'), ctrl.addNew)
router.delete('/:id', ctrl.deleteNew)
router.put('/:id', upload.single('cover'), ctrl.updateNew)


module.exports = router