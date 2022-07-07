import graphql, { GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { promisify } from "util";
import handlebars from "handlebars";
import paypal from "paypal-rest-sdk";

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
import { ItemType, LikedAndTotalLikes } from "./GraphQL/CustomType.js";
import {
  FirstNameRegex,
  LastNameRegex,
  PasswordRegex,
  EmailRegex,
} from "./GraphQL/RegexType.js";
import { LoginResultType, PaymentResultType } from "./GraphQL/MiscType.js";
import { send_mail } from "./logic/mail/send_mail.js";
import { search_products } from "./logic/products.js";
import { AddressOneType, AddressTwoType } from "./GraphQL/AddressType.js";
import {
  config_paypal,
  create_address_json,
  create_payment_json,
  decideTotal,
} from "./logic/payment.js";
import Orders from "./models/Orders.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUserInfo: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(par, args) {
        const user = User.findById(args.id).lean();
        if (user) {
          return user.lean();
        } else {
          return undefined;
        }
      },
    },
    getProducts: {
      type: new GraphQLList(ProductType),
      args: {
        dark: { type: new GraphQLNonNull(GraphQLBoolean) },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(par, args) {
        return await Products.find({ dark: args.dark })
          .lean()
          .skip(args.offset ? args.offset : 0)
          .limit(args.limit ? args.limit : 0);
      },
    },
    getAccessories: {
      type: new GraphQLList(AccessoryType),
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(par, args) {
        return await Accessories.find({})
          .lean()
          .skip(args.offset ? args.offset : 0)
          .limit(args.limit ? args.limit : 0);
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
    getIfLikedAccessoryByUserAndTotalLikes: {
      type: LikedAndTotalLikes,
      args: {
        id: { type: GraphQLID },
        accessory_id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(par, args) {
        var res = { likes: 0, liked: false };
        const accessory = await Accessories.findById(args.accessory_id);
        if (accessory) {
          res.likes = accessory.likes;
          if (args.id) {
            const user = await User.findById(args.id);
            if (user) {
              user.likedProducts.forEach((prod) => {
                if (prod === args.accessory_id) {
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
    get_search_items: {
      type: new GraphQLObjectType({
        name: "OnlyIDType",
        fields: () => ({
          _id: { type: new GraphQLNonNull(GraphQLID) },
        }),
      }),
      args: {
        search_input: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLString },
      },
      async resolve(par, args) {
        await search_products(args.search_input, args.type);
      },
    },
    create_paypal_payment: {
      type: PaymentResultType,
      args: {
        basket: { type: new GraphQLNonNull(new GraphQLList(ItemType)) },
        addressOne: { type: new GraphQLNonNull(AddressOneType) },
        addressTwo: { type: AddressTwoType },
        _id: { type: GraphQLID },
        country_code: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(par, args) {
        try {
          const total = await decideTotal(args.basket);
          const json_addr = create_address_json(
            args.addressOne,
            args.addressTwo,
            args.country_code
          );
          const payment_json = create_payment_json(json_addr, total);
          paypal.payment.create(payment_json, async (error, payment) => {
            if (error) {
              throw error;
            }
            var res = {
              success: false,
              message: "Could not create your order",
            };
            for (let i = 0; i < payment.links.length; i++) {
              // eslint-disable-next-line security/detect-object-injection
              if (payment.links[i].rel === "approval_url") {
                await new Orders({
                  madeBy: args._id,
                  orderInformation: payment.transactions,
                  payId: payment.id,
                  method: "PayPal",
                }).save();

                res = {
                  success: true,
                  // eslint-disable-next-line security/detect-object-injection
                  redirect_link: payment.links[i].href,
                };
              }
            }
            return res;
          });
        } catch (err) {
          return {
            success: false,
            message: "There was a problem while processing payment.",
          };
        }
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
        let opts = {};
        if (args.first) opts.first = args.first;
        if (args.last) opts.last = args.last;
        if (args.email) opts.email = args.email;
        if (args.birthDate) opts.birthDate = args.birthDate;
        if (args.phoneNumber) opts.phoneNumber = args.phoneNumber;
        return await User.findOneAndUpdate(
          { id: args.id },
          {
            $set: {
              first: opts.first,
              last: opts.last,
              email: opts.email,
              birthDate: opts.birthDate,
              phoneNumber: opts.phoneNumber,
            },
          },
          { new: true }
        );
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
    modifyUserLikedAccessories: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        likedId: { type: new GraphQLNonNull(GraphQLString) },
        liked: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(parent, args) {
        return await User.findById(args.id).then(async (doc) => {
          const acc = await Accessories.findById(args.likedId);
          const likedAcc = doc.likedProducts.find(
            (acc) => acc === args.likedId
          );
          if (args.liked) {
            if (likedAcc) return doc;
            else {
              doc.likedProducts.push(args.likedId);
              acc.likes++;
              await acc.save();
              await doc.save().then((docSaved) => {
                return docSaved;
              });
            }
          } else {
            if (likedAcc) {
              doc.likedProducts = doc.likedProducts.filter((acc) => {
                if (acc !== args.likedId) return acc;
              });
              acc.likes--;
              await acc.save();
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

            const template = await handlebars.compile(html);
            const data = {
              uuid: verification_uuid,
              id,
            };
            // TODO: UNcommnet in production
            // let html_to_send = template(data);
            // await send_mail(
            //   email,
            //   "NB - Verification Email",
            //   "Please click access this link to verify your account: https://about-us-clone.herokuapp.com/verify_email/query?uuid=" +
            //     verification_uuid +
            //     "&id=" +
            //     id,
            //   html_to_send
            // );
            let html_to_send = await template(data);
            await send_mail(
              email,
              "NB - Verification Email",
              "Please click the following link to verify your email: http://localhost:5000/verify_email/query?uuid=" +
                verification_uuid +
                "&id=" +
                id,
              html_to_send
            )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
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
