//Import type helpers from graghql-js
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    field: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        }
    }
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType
    //mutation:
})

module.exports = ncSchma;