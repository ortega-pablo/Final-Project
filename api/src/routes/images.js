const { Router } = require("express");
const router = Router();
const uploadFile = require("../middleware/multer")
const axios = require ("axios")


router.post("/",uploadFile(), async (req, res, next) => {
  try {
    console.log(req.file)
    res.status(200).send("Upload image succesfuly")
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;
