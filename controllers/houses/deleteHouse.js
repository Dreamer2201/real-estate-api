const House = require('../../models/house')
const {HttpError} = require('../../helpers/index')

const deleteContact = async (req, res, next) => {
    try {
      const {id} = req.params
      const removeContact = await House.findByIdAndDelete(id)
      if(!removeContact) {
        throw HttpError(404, "Not found")
      }
      res.status(200).json({
        message: "House success deleted"
      })
    }
    catch (error) {
      next(error)
    }
  }

  module.exports = deleteContact