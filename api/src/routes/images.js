const { Router } = require("express");
const router = Router();
const fs = require("fs");
const upload = require("../middleware/multer")
const cloudinary = require("../middleware/cloudinary")
const axios = require ("axios")

router.post("/upload", upload.array("image"), async (req, res, next)=>{
  const {productId} = req.query

  const uploader = async (path) => await cloudinary.uploads(path,"Images")
  if(req.method === "POST"){
    const urls = []
    const files = req.files
    for(const file of files){
      const { path } = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    console.log(urls)

    urls.map( async (el) =>  {

      console.log(el.url)
      return await axios.post(`http://localhost:3001/products/addImage?urlFile=${el.url}&productId=${productId}`)
    })

    res.status(200).send({
      message: "Images uploaded successfully",
      data: urls
    })
  }else {
    res.status(405).send("Images not uploaded successfully")
  }
})


module.exports = router;
