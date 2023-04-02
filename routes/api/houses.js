const express = require('express')
const {upload} = require('../../middlewares/index')
const ctrl = require('../../controllers/houses/index')

const router = express.Router()

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getHouseById)
router.post('/', upload.array('imgs', 8), ctrl.addHouse)
router.delete('/:id', ctrl.deleteHouse)

router.put('/:id', upload.array('imgs', 8), ctrl.updateHouse)

// .array(fieldname[, maxCount])


module.exports = router