const multer = require("multer"); //engolvamos la libreria multer dentro de una constante

const storage = multer.diskStorage({
  /* destination: function (req, file, cb) {
    cb(null, "./public/files");
  }, */
  filename: function (req, file, cb) {
    let extension = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, `${Date.now()}${extension}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image.jpg" ||
    file.mimetype === "image.png"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsoported File Format" }, false);
  }
};

const upload = multer({
  storage: storage,
  imageFilter: imageFilter,
});

module.exports = upload;
