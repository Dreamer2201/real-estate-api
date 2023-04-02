const path = require('path')
const fs = require('fs/promises')
const Jimp = require("jimp")

const House = require('../../models/house')
const {schemaHouse} = require('../../shemas/index')


const housesDir = path.join(__dirname, "../", '../', "public", "houses")

const addHouse = async (req, res, next) => {
    console.log(req.body.title)
    console.log(req.files)
    try {
      const {title} = req.body

      const {error} = schemaHouse.validate(req.body)
      if (error) {
        throw HttpError(400, "Missing fields")
      }
      
// make dir for images current house
      await fs.mkdir(path.join(housesDir, `${title}`))
      const currentHouseDir = path.join(housesDir, `${title}`)

// remove imgs from temp dir to public dir
      await req.files.forEach(async (item) => {
        const {path: tempupload, originalname} = item
        const resultUpload = path.join(currentHouseDir, originalname)
        await fs.rename(tempupload, resultUpload)

// resize img
        await Jimp.read(resultUpload).then(img => {
          img.resize(250, 250).write(resultUpload)
      })
      })

// create array of imgs house for MongoDB
      const arrImgs = await req.files.reduce((arr, item) => {
        const {originalname} = item
         const imgPath = path.join('houses', `${title}`, originalname)
        arr.push(imgPath)
        return arr;
      }, [])

      const data = await House.create({
        ...req.body,
        imgs: [...arrImgs],
      })
      res.status(201).json(data)
    } 

    catch (error) {
      next(error)
    }
  }

module.exports = addHouse