import graphql, { GraphQLNonNull } from "graphql";

import { GraphQLString, GraphQLObjectType } from "graphql";

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    first: { type: new GraphQLNonNull(GraphQLString) },
    last: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});


export default UserType;