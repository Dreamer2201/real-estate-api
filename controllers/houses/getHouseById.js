const House = require('../../models/house')
const {HttpError} = require('../../helpers/index')

const getHouseById = async (req, res, next) => {
    try {
      const {id} = req.params
      console.log(req.params)
      const house = await House.findById(id)
      if(!house) {
        throw HttpError(404, "House is not found")
      }
      res.status(200).json(house)
    }
    catch (error) {
      next(error)
    }
  }

module.exports = getHouseById