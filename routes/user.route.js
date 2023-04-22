const { registerUser, loginUser, getUserInfo } = require("../controllers/user.controller");
const passport = require("passport");
require("../config/passport");


const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/info", passport.authenticate('jwt', { session: false }), getUserInfo);

module.exports = router;