const { createChat, userChats, findChat } = require("../controllers/chat.controller");
const passport = require("passport");
require("../config/passport");

const router = require("express").Router();

router.post("/:username", passport.authenticate('jwt', { session: false }), createChat);
router.get("/", passport.authenticate('jwt', { session: false }), userChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;