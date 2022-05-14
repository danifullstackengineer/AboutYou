import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean } from "graphql";

const AccessoryType = new GraphQLObjectType({
    name: "AccessoryType",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        backgroundImg: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLFloat)},
        likes: {type: new GraphQLNonNull(GraphQLInt)},
        parentId: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
        dark: {type: new GraphQLNonNull(GraphQLBoolean)}
    })
})

export default AccessoryType;