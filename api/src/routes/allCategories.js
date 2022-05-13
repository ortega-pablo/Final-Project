const { Router } = require("express");
const router = Router();

const { Category, SubCategory } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const getCategories = await Category.findAll({
      include: {
        model: SubCategory,
        attributes: ["name", "description", "thumbnail"],
        through: {
          attributes: [],
        },
      },
    });

    res.status(200).send(getCategories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
