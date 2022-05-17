require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    define: {
      freezeTableName: true,
    }
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Address,
  Answer,
  Ask,
  Category,
  Discount,
  Order,
  Payment,
  Product,
  ProductInventory,
  ProductSpecification,
  ShoppingCart,
  Specification,
  User,
  SubCategory,
} = sequelize.models;

// Aca vendrian las relaciones
Product.belongsToMany(Discount, { through: "discount_products"});
Discount.belongsToMany(Product, { through: "discount_products"});

Product.belongsToMany(Specification, { through: ProductSpecification});
Specification.belongsToMany(Product, { through: ProductSpecification});

Product.belongsToMany(Order, { through: "orderItems"});
Order.belongsToMany(Product, { through: "orderItems"});

Order.hasMany(Ask);
Ask.belongsTo(Order)

Product.hasMany(Ask);
Ask.belongsTo(Product)

Ask.hasOne(Answer)
Answer.belongsTo(Ask)

User.hasMany(Ask)
Ask.belongsTo(User)

User.hasMany(Answer)
Answer.belongsTo(User)

Product.belongsToMany(Category, { through: "product-category"});
Category.belongsToMany(Product, { through: "product-category"});

Category.belongsToMany(SubCategory, { through: "sub_Categories"});
SubCategory.belongsToMany(Category, { through: "sub_Categories"});

Product.belongsToMany(SubCategory, { through: "product-subCategory"});
SubCategory.belongsToMany(Product, { through: "product-subCategory"});

Product.hasOne(ProductInventory)
ProductInventory.belongsTo(Product)

ShoppingCart.hasMany(Product)
Product.belongsTo(ShoppingCart)

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(ShoppingCart)
ShoppingCart.belongsTo(User)

User.hasMany(Address)
Address.belongsTo(User)

User.belongsToMany(Payment, { through: "user-payment"})
Payment.belongsToMany(User, { through: "user-payment"})



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
