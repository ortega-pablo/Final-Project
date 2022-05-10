const { Router } = require("express");
const { User, Ask, Answer } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { content } = req.body;
  const { UserId, askId } = req.query;

  try {
    const user = await User.findAll({
      where: {
        id: UserId,
      },
    });
    const ask = await Ask.findAll({
      where: {
        id: askId,
      },
    });
    const newAnswer = await Answer.create({
      content,
    });

    newAnswer.addUser(user);
    newAnswer.addAsk(ask);

    res.status(200).send(newAnswer);
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
