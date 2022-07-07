import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";

const AddressOneType = new GraphQLInputObjectType({
  name: "AddressOneType",
  fields: () => ({
    formality: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    addressOne: { type: new GraphQLNonNull(GraphQLString) },
    addressTwo: { type: GraphQLString },
    state: { type: GraphQLString },
    p_code: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    birth: { type: new GraphQLNonNull(GraphQLString) },
    tax: { type: GraphQLString },
  }),
});

const AddressTwoType = new GraphQLInputObjectType({
  name: "AddressTwoType",
  fields: () => ({
    formality: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    addressOne: { type: new GraphQLNonNull(GraphQLString) },
    addressTwo: { type: GraphQLString },
    state: { type: GraphQLString },
    p_code: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export { AddressOneType, AddressTwoType };
