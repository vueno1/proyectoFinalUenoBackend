const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, "../uploads")
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname)
    }
})

const multerMidelware = multer({storage: storage})
module.exports = multerMidelware