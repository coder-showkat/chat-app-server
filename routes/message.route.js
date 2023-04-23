const { addMessage, getMessage } = require("../controllers/message.controller");
const passport = require("passport");
require("../config/passport");

const router = require("express").Router();

router.post("/", passport.authenticate('jwt', { session: false }), addMessage);
router.get("/:chatId", getMessage);

module.exports = router;