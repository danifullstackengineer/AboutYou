import graphql, { GraphQLList, GraphQLNonNull } from "graphql";

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
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
export default schema;
