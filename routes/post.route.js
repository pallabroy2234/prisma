const expires = require("express");
const router = expires.Router();
const isLoggediIn = require("../middleware/middleware");

const {createPost, updatePost, deletePost, getAllposts} = require("../controllers/post.controller");

router.route("/post/create").post(isLoggediIn, createPost);

router.route("/post/update/:id").put(isLoggediIn, updatePost);

router.route("/post/delete/:id").delete(isLoggediIn, deletePost);

router.route("/post/get").get(getAllposts);

module.exports = router;
