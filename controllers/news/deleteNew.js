const New = require('../../models/new')
const {HttpError} = require('../../helpers/index')

const deleteNew = async (req, res, next) => {
    try {
      const {id} = req.params
      const deletedNew= await New.findByIdAndDelete(id)
      if(!deletedNew) {
        throw HttpError(404, "New is not found")
      }
      res.status(200).json({
        messaga: "New is success deleted"
      })
    }
    catch (error) {
      next(error)
    }
  }

module.exports = deleteNew