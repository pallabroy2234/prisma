const expires = require("express");
const {signUp} = require("../controllers/user.controller");
const router = expires.Router();

router.route("/signup").post(signUp);

module.exports = router;
