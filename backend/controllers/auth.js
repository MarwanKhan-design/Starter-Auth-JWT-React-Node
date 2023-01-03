import { User } from "../models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";

export const login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password ");

  console.log(user.password);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password ");
  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res.json(token);
};

async function validate(user) {
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
