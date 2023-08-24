require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const app = express();
const PORT = process.env.PORT || 4000;

// middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cookie aprser middleware
app.use(cookieParser());

// root route
app.get("/", (req, res) => {
  res.send("Prisma is working");
});

// custom  router
app.use("/api", userRouter);

app.use("/api", postRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
