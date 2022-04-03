import graphql, { GraphQLInt, GraphQLNonNull } from "graphql";

import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
} from "graphql";

const SliderTwoType = new GraphQLObjectType({
  name: "SliderTwoType",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    backgroundImg: { type:GraphQLString },
    foregroundImg: { type: GraphQLString },
    tags: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "SliderTwoTagType",
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
          name: "SliderTwoPriceType",
          fields: () => ({
            full: { type: GraphQLString },
            discount: { type: GraphQLString },
          }),
        }),
      },
    price: {type: GraphQLString},
    colors: { type: new GraphQLList(GraphQLString) },
      sizes: { type: new GraphQLList(GraphQLString) },
    slideNumber: {type: GraphQLInt}
  }),
});

export default SliderTwoType;
