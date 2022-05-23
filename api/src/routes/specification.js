const { Router } = require("express");
const router = Router();

const {Product, Specification, ProductSpecification } = require("../db");

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
}


);
router.get("/all", async (req, res, next) => {
  try {
    const specifications = await Specification.findAll({
      
    });
    res.status(200).send(specifications)
  } catch (error) {
    sen.status(400)
  }
});
router.get("/", async (req, res, next) => {
  const { specName, productId } = req.query;

  try {
    if (specName) {
      const getProduct = await Product.findAll({
        include: [
          {
            model: Specification,
            attributes: ["id", "name"],
            through: {
              attributes: ["value"],
            },
          },
        ],
      });

      const mapped = getProduct.map((e) => {
        return {
          productId: e.id,
          name: e.name,
          specifications: e.specifications && e.specifications,
        };
      });

      
      //  console.log(mapped.map(e => e.specifications.map(v => v.name)))  // Puta mierda
      // const found = await mapped?.map(e => e.specifications.map(v => v.name)).flat().filter(e => e.toLowerCase().includes(specName.toLowerCase()));
      // found.length ? res.status(200).json(found) : res.json("Specification not found, please try another search");
      res.status(200).send(mapped);
    }
  } catch (error) {
    next(error);
  }
});



router.get("/:specificationId", async (req, res, next) => {

  const {specificationId, specificationValueId} = req.query

  try{
    
  } catch(error){
    next(error)
  }
})
// router.get("/", async (req, res, next) => {   // SPECIFICATION BY ID
  
//   const {specName, productId} = req.query

//   try{
//     if(specName){

//       const getProduct = await Product.findAll({
//         include: [
//           {
//             model: Specification,
//             attributes: ["id", "name"],
//             through: {
//                 attributes: ["value"],
//             },
//         }
//         ]
//       })
    
//       const mapped = getProduct.map(e => {
//         return {
//           productId: e.id,
//           name: e.name,
//           specifications:  e.specifications && e.specifications
//         }
//       })

      
//       //  console.log(mapped.map(e => e.specifications.map(v => v.name)))  // Puta mierda
//       // const found = await mapped?.map(e => e.specifications.map(v => v.name)).flat().filter(e => e.toLowerCase().includes(specName.toLowerCase()));
//       // found.length ? res.status(200).json(found) : res.json("Specification not found, please try another search");
//       res.status(200).send(mapped)

//     }
   
//   }catch(error){
//     next(error)
//   }
// })

router.put("/", async (req, res, next) => {

  const {specificationId, productId} = req.query;
  const {name, value} = req.body

  try {
    if(productId) {

     if(specificationId && name){

      const getSpecification = await Product.findOne({
        where: {
          id: productId
        }, 
        include: [
          {
            model: Specification, 
            where: {
              id: specificationId
            },
            attributes: ["id", "name"],
          }
        ]
      })

      const updateName = await Specification.update({
        name,
        },
        {
        where: {
            id: specificationId
        }
      })

      
      getSpecification && updateName ?
      res.status(200).send("Specification value updated successfully!") :
      res.send("No specification associated with this product")

     } else if(specificationId && value){

      const getSpecificationValue = await ProductSpecification.findOne({
        where: {
          specificationId,
          productId
        }
      })

      const updateValue = await ProductSpecification.update({
        value,
      },
      {
      where: {
        specificationId,
        productId
        }
        })

        getSpecificationValue && updateValue ?
        res.status(200).send("Specification value updated successfully!") :
        res.send("No specification associated with this product")

     }

    } else {
      return res.send("Product not found")
    }

  } catch(error){
    next(error)
  }
})

router.put("/:specificationId", async (req, res, next) => {

  const {specificationId} = req.params
  const {name, value} = req.body

  try {
    if(specificationId){

      if(specificationId && name) {

        
      const findASpec = await Specification.findOne({
        where: {
          id: specificationId
        }
      })

        const updateName = await Specification.update({
          name,
          },
          {
          where: {
              id: specificationId
          }
        })

        findASpec && updateName ?
        res.status(200).send("Specification name updated successfully!") :
         res.send("No specification found")
  
      } else if(specificationId && value){

        const getSpecificationValue = await ProductSpecification.findOne({
          where: {
            specificationId,
          }
        })
  
        const updateValue = await ProductSpecification.update({
          value,
        },
        { where: {specificationId,}})

        getSpecificationValue && updateValue ?
        res.status(200).send("Specification value updated successfully!") :
        res.send("No value associated with this specification")

      }

    } else {
      return res.send("No specification found!")
    }

  } catch(error){
    next(error)
  }
})


router.delete("/:specificationId", async (req, res, next) => {

  const {specificationId} = req.params;
  
  try{

    const findASpec = await Specification.findOne({
      where: {
        id: specificationId
      }
    })
    
    if(findASpec){
      
       await Specification.destroy({
        where: {
          id: specificationId
      }
      })

      return res.send("Specification deleted successfully!")

    } else {
      return res.send("Product or specification not found")
    }


  }catch(error){
    next(error)
  }
})


module.exports = router;
