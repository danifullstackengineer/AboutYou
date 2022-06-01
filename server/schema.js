import graphql, { GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { promisify } from "util";
import handlebars from "handlebars";

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import ProductType from "./GraphQL/ProductType.js";
import UserType from "./GraphQL/UserType.js";
import User from "./models/User.js";
import Products from "./models/Products.js";
import Accessories from "./models/Accessories.js";
import AccessoryType from "./GraphQL/AccessoryType.js";
import { LikedAndTotalLikes } from "./GraphQL/CustomType.js";
import {
  FirstNameRegex,
  LastNameRegex,
  PasswordRegex,
  EmailRegex,
} from "./GraphQL/RegexType.js";
import { LoginResultType } from "./GraphQL/MiscType.js";
import { send_mail } from "./logic/mail/send_mail.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUserInfo: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(par, args) {
        const user = await User.findById(args.id);
        if (user) {
          return user;
        } else {
          return undefined;
        }
      },
    },
    getProducts: {
      type: new GraphQLList(ProductType),
      args: {
        dark: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(par, args) {
        return await Products.find({ dark: args.dark });
      },
    },
    getAccessories: {
      type: new GraphQLList(AccessoryType),
      args: {},
      async resolve(par, args) {
        return await Accessories.find({});
      },
    },
    getSingleProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(par, args) {
        return await Products.findById(args.id);
      },
    },
    getAccessoriesBasedOnParent: {
      type: new GraphQLList(AccessoryType),
      args: {
        parentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(par, args) {
        return await Accessories.find({ parentId: args.parentId });
      },
    },
    getIfLikedProductByUserAndTotalLikes: {
      type: LikedAndTotalLikes,
      args: {
        id: { type: GraphQLID },
        product_id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(par, args) {
        var res = { likes: 0, liked: false };
        const product = await Products.findById(args.product_id);
        if (product) {
          res.likes = product.likes;
          if (args.id) {
            const user = await User.findById(args.id);
            if (user) {
              user.likedProducts.forEach((prod) => {
                if (prod === args.product_id) {
                  res.liked = true;
                  return;
                }
              });
            }
          }
        }
        return res;
      },
    },
    login_user_no_third_party: {
      type: LoginResultType,
      args: {
        email: { type: new GraphQLNonNull(EmailRegex) },
        password: { type: new GraphQLNonNull(PasswordRegex) },
      },
      async resolve(_, args) {
        const user = await User.findOne({ email: args.email });
        if (!user)
          return {
            success: false,
            message: "Invalid credentials.",
          };
        if (!user.verified)
          return { success: false, message: "Please verify your account." };
        return await bcrypt
          .compare(args.password, user.password)
          .then((resHash) => {
            if (resHash) {
              const id = user.id;
              const expiry = 30;
              if (process.env.TOKEN_SECRET) {
                const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
                  expiresIn: expiry * 30,
                });
                return {
                  success: true,
                  message: "Succesfully logged in.",
                  token,
                  uid: user.id,
                  expirationDate: new Date(
                    new Date().getTime() + expiry * 60000
                  ),
                };
              } else {
                return {
                  success: false,
                  message:
                    process.env.NODE_ENV === "production"
                      ? "Please ensure you're using a Token secret"
                      : "Something went wrong, please try again. If the problem persists, please contact us via email.",
                };
              }
            } else {
              return {
                success: false,
                message: "Invalid credentials.",
              };
            }
          })
          .catch(() => {
            return { success: false, message: "Invalid credentials." };
          });
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    modifyUserInformation: {
      type: UserType,
      args: {
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        email: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(par, args) {
        const currentUser = await User.findById(args.id);
        if (currentUser) {
          const newUser = {
            first: args.first ? args.first : currentUser.first,
            last: args.last ? args.last : currentUser.last,
            email: args.email ? args.email : currentUser.email,
            birthDate: args.birthDate ? args.birthDate : currentUser.birthDate,
            phoneNumber: args.phoneNumber
              ? args.phoneNumber
              : currentUser.phoneNumber,
          };
          return await User.findOneAndUpdate(
            { id: args.id },
            {
              first: newUser.first,
              last: newUser.last,
              email: newUser.email,
              birthDate: newUser.birthDate,
              phoneNumber: newUser.phoneNumber,
            }
          );
        }
      },
    },
    modifyUserLikedProducts: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        likedId: { type: new GraphQLNonNull(GraphQLString) },
        liked: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(parent, args) {
        return await User.findById(args.id).then(async (doc) => {
          const prod = await Products.findById(args.likedId);
          const likedProd = doc.likedProducts.find(
            (product) => product === args.likedId
          );
          if (args.liked) {
            if (likedProd) return doc;
            else {
              doc.likedProducts.push(args.likedId);
              prod.likes++;
              await prod.save();
              await doc.save().then((docSaved) => {
                return docSaved;
              });
            }
          } else {
            if (likedProd) {
              doc.likedProducts = doc.likedProducts.filter((product) => {
                if (product !== args.likedId) return product;
              });
              prod.likes--;
              await prod.save();
              await doc.save().then((docSaved) => {
                return docSaved;
              });
            } else {
              return doc;
            }
          }
        });
      },
    },
    register_user_no_third_party: {
      type: UserType,
      args: {
        first: { type: new GraphQLNonNull(FirstNameRegex) },
        last: { type: new GraphQLNonNull(LastNameRegex) },
        email: { type: new GraphQLNonNull(EmailRegex) },
        password: { type: new GraphQLNonNull(PasswordRegex) },
      },
      async resolve(_, args) {
        const isUser = await User.findOne({ email: args.email });
        if (isUser) return { id: -1, email: "" };
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(args.password, salt);
        const user = new User({
          first: args.first,
          last: args.last,
          email: args.email,
          password: hash,
        });
        return await user
          .save()
          .then(async ({ email, id, verification_uuid }) => {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            const read_file = await promisify(fs.readFile);
            const html = await read_file(
              "./logic/mail/verify_account.html",
              "utf-8"
            );

            const template = handlebars.compile(html);
            const data = {
              uuid: verification_uuid,
              id,
            };
            let html_to_send = template(data);
            await send_mail(
              email,
              "NB - Verification Email",
              "Please click access this link to verify your account: https://about-us-clone.herokuapp.com/verify_account/" +
                verification_uuid +
                "",
              html_to_send
            );
            return { id, email };
          });
      },
    },
    // verify_email: {
    //   type: UserType,
    //   args: {
    //     email: { type: new GraphQLNonNull(EmailRegex) },
    //   },
    //   async resolve(_, args) {
    //     const user = await User.findOne({ email: args.email });
    // 	if(!user) return null;
    //     const mail = await send_mail(
    //       args.email,
    //       "Email Verification - NB",
    //       "Please click the link to verify your email address: ",
    //       "test html"
    //     );
    //     console.log(mail);
    //   },
    // },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
export default schema;
