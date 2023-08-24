const prisma = require("../prisma/index");

// create new post

exports.createPost = async (req, res, next) => {
  try {
    const {slug, title, body, authorId} = req.body;
    // validation

    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: {connect: {id: authorId}},
      },
    });

    res.json(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

// update post
exports.updatePost = async (req, res, next) => {
  const {id} = req.params;
  const {title, body} = req.body;

  try {
    const result = await prisma.post.update({
      where: {id: id},
      data: {
        title: title,
        body: body,
      },
    });
    res.json({
      message: "Post updated successfully",
      result,
    });
  } catch (error) {
    res.json({
      error: `Post with id ${id} not found`,
    });
  }
};

// delete post

exports.deletePost = async (req, res, next) => {
  const {id} = req.params;
  try {
    const result = await prisma.post.delete({
      where: {id: id},
    });

    res.json({
      message: "Post deleted successfully",
      result,
    });
  } catch (error) {
    res.json({
      error: `Post with id ${id} not found`,
    });
  }
};

// get all posts

exports.getAllposts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (error) {
    res.json({
      error: "No post was found",
    });
  }
};
