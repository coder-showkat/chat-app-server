const { addMessage, getMessage } = require("../controllers/message.controller");

const router = require("express").Router();

router.post("/", addMessage);
router.get("/:chatId", getMessage);

module.exports = router;