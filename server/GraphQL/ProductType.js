import  { GraphQLNonNull } from "graphql";

import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat
} from "graphql";

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    backgroundImg: { type: new GraphQLNonNull(GraphQLString) },
    foregroundImg: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    colors: { type: new GraphQLList(GraphQLString) },
    sizes: { type: new GraphQLList(GraphQLString) },
    accessoryId: { type: new GraphQLList(GraphQLString) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export default ProductType;
