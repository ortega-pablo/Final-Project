const { Router } = require("express");
const { Category, SubCategory } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, description, thumbnail } = req.body;
  const { categoryId} = req.query;

  try {
    if (categoryId) {
      const category = await Category.findAll({
        where: {
          id: categoryId,
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



router.get("/", async (req, res, next) => {

  const {name} = req.query
  try {
    if(name){
      const getCategories = await Category.findAll({
        include: {
          model: SubCategory,
          
          through: {
            attributes: [],
          },
        },
      });
      
      const found = await getCategories?.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

      found.length ? res.status(200).json(found) : res.json("Category not found, please try another search");

      res.status(200).send(getCategories);

    } else{

      const getAll = await Category.findAll({
        include: {
          model: SubCategory,
       
          through: {
            attributes: [],
          },
        },
      });

      console.log(getAll)
      return res.status(200).send(getAll)

    }
  } catch (error) {
    next(error);
  }
});



router.get("/subcategories", async (req, res) => {
  
  const {name} = req.query

  try{
    if(name) {

      const findByName = await SubCategory.findAll()
      const found = await findByName?.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

      found.length ? res.status(200).json(found) : res.json("Subcategory not found, please try another search");

    } else {
      const getAll = await SubCategory.findAll()
      return res.status(200).send(getAll)
    }
  } catch(error){
    res.send(error)
  }
})

module.exports = router;