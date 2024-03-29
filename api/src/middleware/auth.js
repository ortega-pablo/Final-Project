const { User } = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headerToken = req.header("Authorization");

    if (!headerToken) {
      return res.status(401).json({ error: "Token not found!" });
    }
    const token = headerToken.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.KEY_WORD_JWT);

      if (decoded) {
        const user = await User.findOne({ where: { id: decoded.id } });
        req.id = user.dataValues.id;
        req.role = user.dataValues.role;

        next();
      } else {
        return res.status(401).json({ error: "Token no valido" });
      }
    } catch (error) {
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
