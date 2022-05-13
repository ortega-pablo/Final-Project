const { Router } = require("express");
const router = Router();

const { Specification, ProductSpecification } = require("../db");

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
  
})


module.exports = router;