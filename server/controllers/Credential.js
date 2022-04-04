import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  registerGood,
  registerBad,
  registerExists,
  loginGood,
  loginBad,
  loginInvalid,
} from "../QueryResult/Credential.js";

const register = async (req, res) => {
  try {
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const isUser = await User.findOne({ email: body.email });
    if (isUser) {
      return res.send(registerExists);
    }
    const user = new User({
      first: body.first,
      last: body.last,
      email: body.email,
      password: hash,
    });
    await user
      .save()
      .then(() => {
        return res.send(registerGood);
      })
      .catch(() => {
        return res.send(registerBad);
      });
  } catch (err) {
    return res.send(registerBad);
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.send(loginInvalid);
    }
    await bcrypt.compare(body.password, user.password).then((resHash) => {
      if (resHash) {
        const id = user.id;
        if (process.env.TOKEN_SECRET) {
          const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
            expiresIn: 1500,
          });
          return res.send({ ...loginGood, token });
        } else {
          return res.send(loginBad);
        }
      } else {
        return res.send(loginInvalid);
      }
    });
  } catch (err) {
    console.log(err);
    res.send(loginBad);
  }
};

const verifyJWT = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.send(loginBad);
  }
  if (!process.env.TOKEN_SECRET) {
    return res.send(loginBad);
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.send(loginBad);
    }
    req.userId = decoded.id;
    next();
  });
};
const isAuth = async (_, res) => {
  return res.send(loginGood);
};

export { register, login, verifyJWT, isAuth };
