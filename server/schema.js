import graphql from 'graphql';

import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString } from 'graphql';

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        
    }
})
const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields:{}
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})
export default schema;