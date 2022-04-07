import graphql, { GraphQLList } from "graphql";

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import ProductType from "./GraphQL/ProductType.js";
import SliderOneType from "./GraphQL/Sliders/SliderOneType.js";
import SliderTwoType from "./GraphQL/Sliders/SliderTwoType.js";
import UserType from "./GraphQL/UserType.js";
import Product from "./models/Products.js";
import User from "./models/User.js";
import Voucher from "./models/Voucher.js";
import SliderOneProduct from "./models/SliderOne.js";
import SliderTwoProduct from "./models/SliderTwo.js";
import VoucherType from "./GraphQL/VoucherType.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getSliderOneProductsBasedOnSlideNumber: {
      type: new GraphQLList(SliderOneType),
      args: {
        slideNumber: { type: GraphQLInt },
      },
      async resolve(par, args) {
        const item = await SliderOneProduct.find({
          slideNumber: args.slideNumber,
        });
        return item;
      },
    },
    getSliderTwoProductsBasedOnSlideNumber: {
      type: new GraphQLList(SliderTwoType),
      args: {
        slideNumber: { type: GraphQLInt },
      },
      async resolve(par, args) {
        const item = await SliderTwoProduct.find({
          slideNumber: args.slideNumber,
        });
        return item;
      },
    },
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
    getVoucher: {
      type: VoucherType,
      args: {
        voucher: { type: GraphQLString },
      },
      async resolve(par, args) {
        return await Voucher.findOne({ voucher: args.voucher });
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    createUser: {
      type: UserType,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
export default schema;
