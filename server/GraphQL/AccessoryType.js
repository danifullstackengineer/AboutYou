import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";

const AccessoryType = new GraphQLObjectType({
  name: "AccessoryType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    backgroundImg: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    parentId: { type: new GraphQLList(GraphQLString) },
    dark: { type: new GraphQLNonNull(GraphQLBoolean) },
	search_string: {type: GraphQLString},
	/* Temporary - will be removed */
	sizes: {type: new GraphQLList(GraphQLString)},
	colors: {type: new GraphQLList(GraphQLString)}
  }),
});

export default AccessoryType;
