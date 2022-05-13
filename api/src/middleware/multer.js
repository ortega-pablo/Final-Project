const multer = require("multer"); //engolvamos la libreria multer dentro de una constante


function uploadImage(){
    const storage = multer.diskStorage({              
        destination: './public/files',
        filename: function (req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf("."))
            cb(null, Date.now() + extension)
        }
      })
      
      const upload = multer({ storage: storage })

      return  upload;
}

module.export = uploadImage;