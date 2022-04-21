import graphql, { GraphQLList, GraphQLNonNull } from "graphql";

import { GraphQLString, GraphQLObjectType, GraphQLID } from "graphql";

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    first: { type: new GraphQLNonNull(GraphQLString) },
    last: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    birthDate: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    id: { type: GraphQLID },
    likedProducts: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
  }),
});

export default UserType;
