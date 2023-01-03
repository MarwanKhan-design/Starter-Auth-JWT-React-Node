import Joi from "joi";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "config";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

async function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(5).max(50).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  // schema.validate({ username: "abc", birth_year: 1994 });
  // -> { value: { username: 'abc', birth_year: 1994 } }

  const error = schema.validate({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  if (error) return error;

  // -> { value: {}, error: '"username" is required' }

  // Also -
}

export { User, validateUser };
