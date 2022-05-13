const { Router } = require("express");
const router = Router();
const {uploadImage} = require("../middleware/multer")


router.post("/", async (req, res, next) => {
const  image  = require.body
  try {
   uploadImage(image)
   res.status(200).send("Upload image succesfuly")
  } catch (error) {
    next(error);
  }
});

module.exports = router;