import graphql, { GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql";

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
      },
      async resolve(par, args) {
        return await Products.find({
          isCustomizable: args.isCustomizable,
        });
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
              await doc.save().then(() => {
                return doc;
              });
            } else {
              return doc;
            }
          }
        });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
export default schema;
