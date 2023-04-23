const { registerUser, loginUser, getUserInfo, getConnectionInfo } = require("../controllers/user.controller");
const passport = require("passport");
require("../config/passport");


const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/info", passport.authenticate('jwt', { session: false }), getUserInfo);
router.get("/connectionInfo/:id", getConnectionInfo);

module.exports = router;