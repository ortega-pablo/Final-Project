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

      const findByName = await SubCategory.findAll({
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: {
              attributes: []
            }
          }
        ]
      })
      
      const found = await findByName?.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

      found.length ? res.status(200).json(found) : res.json("Subcategory not found, please try another search");

    } else {
      const getAll = await SubCategory.findAll({
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: {
              attributes: []
            }
          }
        ]
      })
      return res.status(200).send(getAll)
    }
  } catch(error){
    res.send(error)
  }
})

router.put("/:categoryId", async (req, res, next) =>{

  const {categoryId} = req.params;
  const { name, description, thumbnail } = req.body;

  try {

    const findCategory = await Category.findOne({
      where: {
        id: categoryId
      }
    })

    
    if(findCategory) {
      await Category.update({
        name,
        description,
        thumbnail,
        },
        {
        where: {
            id: categoryId
        }
      })
      res.status(200).send("Category updated successfully!")

    } else {
      res.send("Category not found")
    }
        
  } catch(error){
    next(error)
  }
})


router.delete("/:categoryId", async (req, res, next) => {

  const {categoryId} = req.params;

  try {
    
  const findCategory = await Category.findOne({
    where: {
      id: categoryId
    }
  })

  if(findCategory) {

    await Category.destroy({
      where: {
        id: categoryId
      }
    })

    res.status(200).send("Category deleted successfully")
  } 
  else {
    res.send("Category not found")
  }

  } catch(error){
    next(error)
  }
})


router.put("/subcategories/:subCategoryId", async (req, res, next) =>{

  const {subCategoryId} = req.params;
  const { name, description, thumbnail } = req.body;

  try {

    const findSubCategory = await SubCategory.findOne({
      where: {
        id: subCategoryId
      }
    })

    
    if(findSubCategory) {
      await SubCategory.update({
        name,
        description,
        thumbnail,
        },
        {
        where: {
            id: subCategoryId
        }
      })
      res.status(200).send("SubCategory updated successfully!")

    } else {
      res.send("SubCategory not found")
    }
        
  } catch(error){
    next(error)
  }
})


router.delete("/subcategories/:subCategoryId", async (req, res, next) => {

  const {subCategoryId} = req.params;

  try {
    
  const findSubCategory = await SubCategory.findOne({
    where: {
      id: subCategoryId
    }
  })

  if(findSubCategory) {

    await SubCategory.destroy({
      where: {
        id: subCategoryId
      }
    })

    res.status(200).send("SubCategory deleted successfully")
  } 
  else {
    res.send("SubCategory not found")
  }

  } catch(error){
    next(error)
  }
})


module.exports = router;