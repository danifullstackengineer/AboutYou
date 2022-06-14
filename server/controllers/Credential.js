import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { send_mail } from "../logic/mail/send_mail.js";
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
      .then(async () => {
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
        const expiry = 30;
        if (process.env.TOKEN_SECRET) {
          const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
            expiresIn: expiry * 30,
          });
          return res.send({
            ...loginGood,
            token,
            uid: user.id,
            expirationDate: new Date(new Date().getTime() + expiry * 60000),
          });
        } else {
          return res.send(loginBad);
        }
      } else {
        return res.send(loginInvalid);
      }
    });
  } catch (err) {
    res.send(loginBad);
  }
};

const verify_email = async (req, res) => {
  try {
    const uuid = req.query.uuid;
    const id = req.query.id;
    return await User.findById(id).then(async (doc) => {
      if (!doc)
        return res.redirect(
          process.env.NODE_ENV === "production"
            ? "https://about-us-clone.herokuapp.com/error/user_not_found"
            : "http://localhost:3000/error/user_not_found"
        );
      if (doc.verified)
        return res.redirect(
          process.env.NODE_ENV === "production"
            ? "https://about-us-clone.herokuapp.com"
            : "http://localhost:3000/"
        );
      if (doc.verification_uuid !== uuid)
        return res.redirect(
          process.env.NODE_ENV === "production"
            ? "https://about-us-clone.herokuapp.com/error/invalid_link"
            : "http://localhost:3000/error/invalid_link"
        );
      doc.verified = true;
      await doc.save();
      return res.redirect(
        process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000"
      );
    });
  } catch (err) {
    res.send("/400");
  }
};

const verifyJWT = async (req, res, next) => {
  try {
    const userData = req.headers["x-access-token"];
    if (!userData) {
      return res.send(loginBad);
    }
    if (!process.env.TOKEN_SECRET) {
      return res.send(loginBad);
    }
    const user = await User.findById(userData.userId);
    if (!user) return res.send(loginBad);
    jwt.verify(userData.token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.send(loginBad);
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.send(loginBad);
  }
};
const isAuth = async (_, res) => {
  return res.send(loginGood);
};

export { register, login, verifyJWT, isAuth, verify_email };
