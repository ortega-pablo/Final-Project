const { Router } = require("express");
const router = Router();

const { ProductSpecification, Specification, Product } = require("../db");

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


module.exports = router;
