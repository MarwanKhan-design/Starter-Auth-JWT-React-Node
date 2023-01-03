import jwt from "jsonwebtoken";
import { User, validateUser } from "../models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import config from "config";

export const createUser = async (req, res) => {
  const { error } = await validateUser(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already Registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash("1234", salt);

  const token = user.generateAuthToken();
  user = await user.save();

  res.json({ user: _.pick(user, ["_id", "name", "email"]), token });
};

export const currentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};
