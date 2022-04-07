import graphql from 'graphql';

import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql';

const VoucherType = new GraphQLObjectType({
    name: "VoucherType",
    fields: () => ({
        voucher: { type: GraphQLString },
        value: { type: GraphQLInt },
        startDate: { type: GraphQLString },
        endDate: {type: GraphQLString}
    })
})

export default VoucherType;