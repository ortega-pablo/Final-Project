const { Router } = require("express");
const { User, Ask, Answer } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { content } = req.body;
  const { userId, askId } = req.query;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const ask = await Ask.findOne({
      where: {
        id: askId,
      },
    });

    const newAnswer = await Answer.create({
      content,
    });

    newAnswer.setUser(userId);
    newAnswer.setAsk(ask);     // changed to set becauase "add" doesnt work

    res.status(200).send(newAnswer);
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
