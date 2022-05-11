const { Router } = require('express');
//const producstRoute = require("./products")
const categoriesRoute = require ("./categories")
const answersRoute = require ("./answers")
const asksRoute = require ("./asks")
const userRoute = require("./user")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.use("/products", producstRoute)
router.use("/categories" , categoriesRoute)
router.use("/answers", answersRoute)
router.use("/asks", asksRoute)
router.use("/user", userRoute)

module.exports = router;
