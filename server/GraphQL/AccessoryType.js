import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList } from "graphql";

const AccessoryType = new GraphQLObjectType({
    name: "AccessoryType",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        image: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLFloat)},
        likes: {type: new GraphQLNonNull(GraphQLInt)},
        parentId: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))}
    })
})

export default AccessoryType;