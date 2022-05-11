const { Router } = require("express");
const { Product } = require("../db");
const router = Router();
const { getAllProducts } = require("../controllers/products");


router.get("/", async (req, res, next) => {
 /*  try {
    let allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    next(error);
  } */
});
