const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'NameType',
    fields: () => {
        const MeType = require('./me');   // put it inside fields
        const TotalVotes = require('./total-votes');
        return {
            id: { type: GraphQLID },
            label: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            createdBy: {
                type: new GraphQLNonNull(MeType),
                // resolve(obj, args, { pgPool }) {
                //     return pgdb(pgPool).getUserById(obj.createdBy);
                // }
                resolve(obj, args, { loaders }) {
                    return loaders.usersByIds.load(obj.createdBy);
                }
            },
            totalVotes: {
                type: TotalVotes,
                resolve(obj, args, { loaders }) {
                    return loaders.totalVotesByNameIds.load(obj.id);
                }
            }
        };
    }
});