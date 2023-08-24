//  bring is prisma and cookie

const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

// user sign up
exports.signUp = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    // check
    if (!name || !email || !password) {
      throw new Error("Please fill all the fields");
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    // send user token
    cookieToken(user, res);
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    return console.log(error.message);
  }
};
