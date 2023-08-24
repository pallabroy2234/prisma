const expires = require("express");
const router = expires.Router();
const {signUp, login, logout} = require("../controllers/user.controller");

router.route("/signup").post(signUp);

router.route("/login").post(login);

router.route("/logout").post(logout);

module.exports = router;
