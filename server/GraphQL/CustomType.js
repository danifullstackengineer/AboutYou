import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLUnionType,
  GraphQLScalarType,
  Kind,
} from "graphql";

const LikedAndTotalLikes = new GraphQLObjectType({
  name: "LikedAndTotalLikes",
  fields: () => ({
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    liked: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

const ItemType = new GraphQLInputObjectType({
  name: "ItemType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    accessoryId: { type: GraphQLID },
    selectedSize: {
      type: new GraphQLScalarType({
        name: "ItemTypeScalarSelectedSize",
        parseLiteral(ast) {
          if (ast.kind === Kind.INT || ast.kind === Kind.STRING) return ast;
          return null;
        },
        parseValue(val) {
          return val;
        },
      }),
    },
    selectedColor: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    //TODO: Change this
    customStyle: { type: GraphQLString },
  }),
});

export { LikedAndTotalLikes, ItemType };
