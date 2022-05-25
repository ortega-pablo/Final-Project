const { Router } = require('express');
const producstRoute = require("./products")
const categoriesRoute = require ("./categories")
const answersRoute = require ("./answers")
const asksRoute = require ("./asks")
const usersRoute = require ("./users")
const discountsRoute = require("./discounts")
const productDetailRoute = require("./productDetail")
const productInventoryRoute = require("./productInventory")
const specificationsRoute = require("./specification")
const imagesRoute = require("./images")
const checkOut = require("./checkOut");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/products", producstRoute)
router.use("/categories" , categoriesRoute)
router.use("/answers", answersRoute)
router.use("/asks", asksRoute)
router.use("/users", usersRoute)
router.use("/discounts", discountsRoute)
router.use("/productDetail", productDetailRoute)
router.use("/inventory", productInventoryRoute)
router.use("/specifications", specificationsRoute)
router.use("/images", imagesRoute)
router.use("/checkOut", checkOut);


module.exports = router;
