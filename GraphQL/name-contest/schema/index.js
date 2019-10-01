const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

// Postgre Database
const pgdb = require('../database/pgdb');
const MeType = require('./types/me');
const pgPool = require('../lib/index');

// The root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me: {
            type: MeType,
            description: 'The current user identified by an api key',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) }
            },
            // resolve: () => {
            //     // return {
            //     //     id: 42,
            //     //     email: 'fake@example.com'
            //     // }
            // }
            // resolve: (obj, args, { pgPool }) => {
            //     //Read user information from database
            //     //using args.key as the api key
            //     //pgPool
            //     return pgdb(pgPool).getUserByApiKey(args.key);
            // }
            resolve: (obj, args, { loaders }) => {
                return loaders.usersByApiKeys.load(args.key);
            }
        }
    }
});

const AddContestMutation = require('./mutations/add-contests');
const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        AddContest: AddContestMutation,
        //AddName: AddNameMutation
    })
})

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = ncSchema;