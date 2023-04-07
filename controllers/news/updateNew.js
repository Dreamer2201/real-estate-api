
const path = require('path')
const fs = require('fs/promises')
const Jimp = require("jimp")

const New = require('../../models/new')
const { schemaNew } = require('../../shemas/schemaNew')
const {HttpError} = require('../../helpers/index')

const updateNew = async (req, res, next) => {
    try {
        const {error} = schemaNew.validate(req.body)
      if (error) {
        throw HttpError(400, "Missing fields")
      }

        const {id} = req.params
        const currentNew = await New.findById(id)
  
    // find path to news dir in project
        const newsDir = path.join(__dirname, "../", '../', "public", "news")

    // remove img from temp dir to public dir
        const {path: temUpload, originalname} = req.file
        const resultUpload = path.join(newsDir, originalname)
        await fs.rename(temUpload, resultUpload)

        const coverUrl = path.join('news', originalname)

        const renewNew = {
            ...req.body,
            cover: coverUrl,
        }

      const data = await New.findByIdAndUpdate(id, renewNew, {new: true})

      if(!data) {
        throw HttpError(404, "Not found")
      }
      res.status(200).json(data)
    }
    catch (error) {
      next(error)
    }
  }

  module.exports = updateNew