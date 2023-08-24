const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggediIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.send("Please login first");
      throw new Error("You are not logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    //you can do more checks

    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = isLoggediIn;
