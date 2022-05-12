const { Router } = require("express");
const { Answer, Ask, User } = require("../db");
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

    newAnswer.setUser(user);
    newAnswer.setAsk(ask);

    res.status(200).send(newAnswer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
