const express = require("express");
const postsRouter = require("./api/posts/routers");

const app = express();
app.use(express.json());
const name = "Meshari Alhouli";

app.use("/posts", postsRouter);

app.listen(8000, () => {
  console.log("the application is running on http://localhost:8000");
});
