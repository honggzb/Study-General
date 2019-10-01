const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');


module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: () => {
        const ContestType = require('./contest');
        const ActivityType = require('./activity');
        return {
            // fields comng from postgreSQL
            id: { type: GraphQLID },
            // firstnName: {
            //     type: GraphQLString,
            //     resolve: obj => obj.first_name
            // },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            fullName: {
                type: GraphQLString,
                resolve: obj => `${obj.firstName} ${obj.lastName}`
            },
            email: { type: new GraphQLNonNull(GraphQLString) },
            createdAt: { type: GraphQLString },
            contests: {
                type: new GraphQLList(ContestType),
                // resolve(obj, args, { pgPool }) {
                //     return pgdb(pgPool).getContests(obj);
                // }
                resolve(obj, args, { loaders }) {
                    return loaders.contestsForUserIds.load(obj.id);
                }
            },
            //fields coming from mongodb
            // contestsCount : {
            //     type: GraphQLInt,
            //     resolve(obj, args, { mPool}, { fieldName }) {
            //         return mdb(mPool).getCounts(obj, fieldName);
            //     }
            //     resolve(obj, args, { loaders }, { fieldName }) {
            //         return loaders.mdb.usersByIds.load(obj.d)
            //                       .then(res => res[fieldName]);
            //     }
            // },
            // namesCount : {
            //     type: GraphQLInt,
            //     resolve(obj, args, { mPool}, { fieldName }) {
            //         return mdb(mPool).getCounts(obj, fieldName);
            //     }
            // },
            // votesCount : {
            //     type: GraphQLInt,
            //     resolve(obj, args, { mPool}, { fieldName }) {
            //         return mdb(mPool).getCounts(obj, fieldName);
            //     }
            // }
            activities: {
                type: new GraphQLList(ActivityType),
                resolve(obj, args, { loaders }) {
                    return loaders.activitiesForUserIds.load(obj.id);
                }
            }
        }
    }
});