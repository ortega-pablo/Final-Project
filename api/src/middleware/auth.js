require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headerToken = req.get("Authorization");
    if (!headerToken) {
      return res.status(401).json({ error: "Token not found!" });
    }

    const token = headerToken.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.KEY_WORD_JWT);
      //req.username = decoded.username;
      //req.id = decoded.email;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
