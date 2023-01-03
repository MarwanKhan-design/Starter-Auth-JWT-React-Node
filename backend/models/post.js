import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  body: String,
});

const post = mongoose.model("Post", postSchema);

export default post;
