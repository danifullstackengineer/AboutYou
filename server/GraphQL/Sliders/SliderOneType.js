import graphql, { GraphQLID, GraphQLNonNull } from "graphql";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";

const SliderOneType = new GraphQLObjectType({
  name: "SliderOneType",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    image: { type: GraphQLString },
    button: { type: GraphQLBoolean },
    heart: { type: GraphQLBoolean },
    lastSlide: { type: GraphQLBoolean },
    title1: { type: GraphQLString },
    title2: { type: GraphQLString },
    slideNumber: { type: GraphQLInt },
    specialTitle: { type: GraphQLString },
    buttonName: { type: GraphQLString },
  }),
});


export default SliderOneType;