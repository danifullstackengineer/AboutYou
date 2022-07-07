import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";

const LoginResultType = new GraphQLObjectType({
  name: "LoginResultType",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: GraphQLString },
    uid: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
  },
});

const PaymentResultType = new GraphQLObjectType({
  name: "PaymentResultType",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    redirect_link: { type: GraphQLString },
    message: { type: GraphQLString },
  },
});

export { LoginResultType, PaymentResultType };
