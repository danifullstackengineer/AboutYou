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
import SliderTwoType from './GraphQL/Sliders/SliderTwoType.js';
import UserType from "./GraphQL/UserType.js";
import Product from "./models/Products.js";
import SliderOneProduct from "./models/SliderOne.js";
import SliderTwoProduct from './models/SliderTwo.js';

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
