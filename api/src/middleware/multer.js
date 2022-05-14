const multer = require("multer"); //engolvamos la libreria multer dentro de una constante


    const storage = multer.diskStorage({              
        destination: function (req, file, cb) {
            cb(null, './public/files')
        },
        filename: function (req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf("."))
            cb(null, `${file.filename}-${Date.now()}.${extension}`)
        }
      })
      const upload = multer({ storage: storage }).single("file")


module.exports = storage;