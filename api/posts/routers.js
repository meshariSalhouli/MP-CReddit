const express = require("express");
const {
  postList,
  postDetail,
  deletePost,
  createPost,
  addCommentToPost,
  deleteCommentById,
} = require("./controller");
const router = express.Router();

router.get("/:postId", postDetail);
router.get("/", postList);
router.post("/", createPost);
router.delete("/:postId", deletePost);
router.post("/:postId/comments", addCommentToPost);
router.delete("/comments/:id", deleteCommentById);

module.exports = router;
