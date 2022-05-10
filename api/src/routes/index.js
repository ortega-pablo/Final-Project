const { Router } = require('express');
//const producstRoute = require("./products")
const categoriesRoute = require ("./categories")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.use("/products", producstRoute)
router.use("/categories" , categoriesRoute)

module.exports = router;
