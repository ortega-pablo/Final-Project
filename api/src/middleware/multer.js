const multer = require("multer"); //engolvamos la libreria multer dentro de una constante
const { getProductsByName } = require("../controllers/products");

function uploadFile () {
    const storage = multer.diskStorage({              
        destination: './public/files',
        filename: function (req, file, cb) {
            const { nameImage }=req.body

            let extension = file.originalname.slice(file.originalname.lastIndexOf("."))
            cb(null, `${nameImage}-${Date.now()}${extension}`)

        }
      })
      const upload = multer({ storage: storage }).single("file")



      return upload;
}

    


module.exports = uploadFile;