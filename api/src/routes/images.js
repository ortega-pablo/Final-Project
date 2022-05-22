const { Router } = require("express");
const router = Router();
const { BannerImages, Image, Product } = require("../db");
const fs = require("fs");
const upload = require("../middleware/multer")
const cloudinary = require("../middleware/cloudinary")
const axios = require ("axios")

router.post("/uploadProduct", upload.array("image"), async (req, res, next)=>{
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

    urls.map( async (el) =>  {

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


router.post("/uploadBanner", upload.array("image"), async (req, res, next)=>{

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

    urls.map( async (el) =>  {
      await BannerImages.create({urlImage: el.url});
    })
    
    res.status(200).send({
      message: "Images uploaded successfully",
      data: urls
    })
  }else {
    res.status(405).send("Images not uploaded successfully")
  }
})

router.get("/uploadBanner", async (req, res, next) => {
  try {
    const images = await BannerImages.findAll({
      
    });
    res.status(200).send(images)
  } catch (error) {
    sen.status(400)
  }
});

// router.put("/removeProduct", async (req, res, next) => {

//   const {productId, imageId} = req.query;

//   try {
//     const findProduct = await Product.findOne({  
//       where: {
//         id: productId
//       }
//     })

//     const findImage = await Image.findOne({
//       where: {
//         id: imageId
//       }
//     })

//     if(findProduct && findImage){

//       findProduct.removeImage(imageId) 
//       res.status(200).send("Image removed successfully!") 

//     } else {
//       return res.send("No product or image found")
//     }
  
//   } catch(error){
//     next(error)
//   }
// })

router.delete("/", async (req, res, next) => {

  const {productId, imageId} = req.query;

  try {
    const findProduct = await Product.findOne({  
      where: {
        id: productId
      }, include: [
        {
          model: Image,
          where: {
            id: imageId
          }
        }
      ]
    })

    console.log(findProduct)

    if(findProduct){

      await Image.destroy({
        where: {
            id: imageId
        }
      })
        
      res.status(200).send("Image deleted successfully!") 

    } else {
      return res.send("No product or image found")
    }
  
  } catch(error){
    next(error)
  }
})



module.exports = router;
