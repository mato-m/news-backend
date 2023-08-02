require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const userRouter = require("./routers/userRouter");
const articleRouter = require("./routers/articleRouter");
const categoryRouter = require("./routers/categoryRouter");
const commentRouter = require("./routers/commentRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/article", articleRouter);
app.use("/category", categoryRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(process.env.PORT, () => {
  console.log("Server started at port " + process.env.PORT);
});
