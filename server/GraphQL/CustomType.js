import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLBoolean } from "graphql";

const LikedAndTotalLikes = new GraphQLObjectType({
    name: "LikedAndTotalLikes",
    fields: () => ({
        likes: {type: new GraphQLNonNull(GraphQLInt)},
        liked: {type: new GraphQLNonNull(GraphQLBoolean)}
    })
})

export {LikedAndTotalLikes}