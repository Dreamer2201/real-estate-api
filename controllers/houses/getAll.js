const House = require('../../models//house')

const getAll = async (req, res, next) => {
    try {
      const data = await House.find({})
      const resData = data.map(({_id, title, total_area, imgs, bedrooms_quantity, 
        kitchen}) => {
          return {_id, title, total_area, imgs, bedrooms_quantity, 
            kitchen}
      })
      console.log(resData)
      res.status(200).json(resData)
    } 
    catch (error) {
      next(error)
    }
  }

module.exports = getAll