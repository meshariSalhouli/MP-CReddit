const uuid4 = require("uuid4");
const posts = require("../../post");
const { title } = require("process");

const postDetail = (request, response) => {
  const foundPost = posts.find((post) => post.id === request.params.postId);
  if (!foundPost) response.status(404).json({ message: "Post not found" });
  response.status(200).json(foundPost);
};
const postList = (request, response) => {
  const { title } = request.query;

  let filteredPost = posts;

  if (title)
    filteredPost = posts.filter((post) => {
      post.title.toLowerCase().includes(title.toLowerCase());
    });

  response.status(200).json(filteredPost);
};

const createPost = (request, response) => {
  const { title, description } = request.body;
  const newPost = {
    id: uuid4,
    title: title,
    description: description,
    comments: [],
  };
  if (!title || !description)
    response.status(400).json({ message: "Bad Request" });
  if (typeof title !== "string")
    response
      .status(400)
      .json({ message: "The 'title' field must be a string." });
  if (typeof description !== "string")
    response
      .status(400)
      .json({ message: "The 'description' field must be a string." });
  posts.unshift(newPost);
  response.status(201).json(newPost);
};

const addCommentToPost = (req, res) => {
  const { postId } = req.params;
  const { username, comment } = req.body;
  if (!username || !comment) {
    return res
      .status(400)
      .json({ message: "Username and comment are required." });
  }
  const post = posts.find((p) => p.id === postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const newComment = { id: uuid4(), username, comment };
  post.comments.push(newComment);
  res.status(201).json(newComment);
};

const deletePost = (request, response) => {
  const foundPost = posts.find((post) => post.id === request.params.postId);
  if (!foundPost) response.status(404).json({ message: "Post not found" });

  const postIndex = posts.findIndex(
    (post) => post.id === request.params.postId
  );
  posts.splice(postIndex, 1);
  response.status(204).json({ message: "Post has been deleted successfully" });
};
const deleteCommentById = (req, res) => {
  const commentId = req.params.id;
  for (const post of posts) {
    const commentIndex = post.comments.findIndex((c) => c.id === commentId);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      return res
        .status(200)
        .json({ message: "Comment has been deleted successfully" });
    }
  }
  res.status(404).json({ message: "Comment not found" });
};
module.exports = {
  postList,
  postDetail,
  deletePost,
  createPost,
  addCommentToPost,
  deleteCommentById,
};
