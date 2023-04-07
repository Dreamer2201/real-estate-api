const path = require('path')
const fs = require('fs/promises')
const Jimp = require("jimp")

const New = require('../../models/new')
const {schemaNew} = require('../../shemas/schemaNew')
const { HttpError } = require('../../helpers')

const newDir = path.join(__dirname, "../", "../", "public", "news")

const addNew = async(req, res, next) => {

    try {
        const {title} = req.body

        const {error} = schemaNew.validate(req.body)
        if(error) {
            throw HttpError(400, "Missing fields")
        }

        const {path: temUpload, originalname} = req.file
     
        const resultUpload = path.join(newDir, originalname)

        await fs.rename(temUpload, resultUpload)
        const coverUrl = path.join('news', originalname)

        const data = await New.create({
            ...req.body,
            cover: coverUrl
        })
        res.status(201).json(data)
    }
    catch(error) {
        next(error)
    }
}

module.exports = addNew
