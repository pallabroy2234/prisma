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
  } catch (error) {
    return console.log(error.message);
  }
};

//  login user

exports.login = async (req, res, next) => {
  try {
    // take info from user
    const {email, password} = req.body;
    //  check
    if (!email || !password) {
      throw new Error("Please provide  email and password");
    }

    // find a user based on email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // when there is no user
    if (user.email != email) {
      throw new Error("Email mismatch");
    }
    // password mismatch
    if (user.password != password) {
      throw new Error("Password mismatch");
    }

    cookieToken(user, res);
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    // return console.log("something went wrong");
  }
};

// logout user

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    // throw new Error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
