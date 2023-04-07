const {schemaHouse} = require('../../shemas/shemaHouse')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require("jimp")

const House = require('../../models/house')
const {HttpError} = require('../../helpers/index')


const updateHouse = async (req, res, next) => {
    try {
        const {error} = schemaHouse.validate(req.body)
      if (error) {
        throw HttpError(400, "Missing fields")
      }

        const {id} = req.params
        const {title} = req.body
        const filesArr = req.files

    // find path to house dir in project
        const housesDir = path.join(__dirname, "../", '../', "public", "houses", `${title}`)

    // remove imgs from temp dir to public dir
        await filesArr.forEach(async (item) => {
            const {path: tempupload, originalname} = item
            const resultUpload = path.join(housesDir, originalname)
            await fs.rename(tempupload, resultUpload)

    // resize img
        await Jimp.read(resultUpload).then(img => {
            img.resize(250, 250).write(resultUpload)
        })
        })

    // create array of imgs house for MongoDB
        const arrImgs = await filesArr.reduce((arr, item) => {
            const {originalname} = item
            const imgPath = path.join('houses', `${title}`, originalname)
            arr.push(imgPath)
            return arr;
        }, [])

    //   const {error} = schemaContact.validate(req.body)
    //   if (error) {
    //     throw HttpError(400, "Missing fields")
    //   }
      const newHouseData = {
        ...req.body,
        imgs: [...arrImgs],
      }

      const data = await House.findByIdAndUpdate(id, newHouseData, {new: true})

      if(!data) {
        throw HttpError(404, "Not found")
      }
      res.status(200).json(data)
    }
    catch (error) {
      next(error)
    }
  }

  module.exports = updateHouse