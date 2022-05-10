const { Router } = require("express");
const { Category, SubCategory } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, description, thumbnail } = req.body;
  const { categoryName } = req.query;

  try {
    if (categoryName) {
      const category = await Category.findAll({
        where: {
          name: categoryName,
        },
      });
      const newSubCategory = await SubCategory.create({
        name,
        description,
        thumbnail,
      });
      newSubCategory.addCategory(category);

      return res.status(200).send(newSubCategory);
    }

    const newCategory = await Category.create({
      name,
      description,
      thumbnail,
    });

    res.status(200).send(newCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
