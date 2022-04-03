import graphql, { GraphQLNonNull } from "graphql";

import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
} from "graphql";

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    backgroundImg: { type:GraphQLString },
    foregroundImg: { type: GraphQLString },
    tags: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "ProductTagType",
          fields: () => ({
            name: { type: GraphQLString },
            special: { type: GraphQLBoolean },
          }),
        })
      ),
    },
    title: { type: GraphQLString},
    priceDiscount: {
      type:
        new GraphQLObjectType({
          name: "ProductPriceType",
          fields: () => ({
            full: { type: GraphQLString },
            discount: { type: GraphQLString },
          }),
        }),
      },
    price: {type: GraphQLString},
    colors: { type: new GraphQLList(GraphQLString) },
    sizes: { type: new GraphQLList(GraphQLString) },
  }),
});

export default ProductType;
