import _ from "lodash";
import Post from "../models/post.js";

export const createPost = async (req, res) => {
  let post = await new Post(_.pick(req.body, ["title", "body"]));

  post.save();
  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndRemove(id);

  if (!post) return res.send("The genre with the given ID is Already Deleted");

  res.send(post);
};
