require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headerToken = req.header("Authorization");
    console.log('estoy en el primer try')
    if (!headerToken) {
      console.log('no leo el header token porque soy un codigo tonto')
      return res.status(401).json({ error: "Token not found!" });
    }
    console.log('me fui del primer if')
    const token = headerToken.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.KEY_WORD_JWT);
      //req.username = decoded.username;
      //req.id = decoded.email;
      console.log('Soy decoded ===>   ', decoded)
      if (decoded) {
        console.log(' voy por el next ')
        next();
      } else {
        console.log(' no funco el decoded')
        return res.status(401).json({ error: "Token no valido"})
      }
    } catch (error) {
      console.log('este catch ya ni se que hace')
      console.log(error);
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log('este menos')
    console.log(error);
  }
};

module.exports = verifyToken;
