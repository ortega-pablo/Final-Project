const { Router } = require("express");
const router = Router();

<<<<<<< HEAD
const { ProductSpecification, Specification, Product } = require("../db");
=======
const { Specification, ProductSpecification } = require("../db");
>>>>>>> b70d9665c111120983c09c06b31d63665ffaa6a3

router.post("/", async (req, res, next) => {
  const { name } = req.body;

  try {
    const addSpecification = await Specification.create({
      name,
    });

    res.status(200).send(addSpecification);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
router.get("/", async (req, res, next) => {
  
  const {name, productId} = req.query

  try{
    if(name){

      const getProduct = await Product.findAll({
        include: [
          {
            model: Specification,
            attributes: ["id", "name"],
            through: {
                as:"value:",
                attributes: ["value"],
            },
        }
        ]
      })
      // res.status(200).send(getProduct)
      // const found = await getProduct?.filter(e => e.name.toLowerCase().includes(e.specifications.name.toLowerCase()));

      // found.length ? res.status(200).json(found) : res.json("User not found, please try another search");
      res.status(200).send(getProduct)

    }
   
  }catch(error){
    next(error)
  }
=======
///////////////////////////////////////////////GET ROUTES ///////////////////////////////////////////
router.get("/:id", async (req, res, next) => {

  const {id} = req.params


    const getAllSpecs = await Specification.findOne({
      where: {
        id
      },
      include: [
        {
          model: ProductSpecification,
          as:"value:",
          attributes: ["value"],
        }
      ]
    })

    return res.status(200).send(getAllSpecs)
  
>>>>>>> b70d9665c111120983c09c06b31d63665ffaa6a3
})


module.exports = router;
