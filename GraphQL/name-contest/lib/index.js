const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require('dataloader');

const{ Pool } = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);

const app = require('express')();

//read the query from command line arguments
const query = process.argv[2];

const ncSchema = require('../schema');
//const { graphql } = require('graphql');
// graphql(ncSchema, query).then( result => {
//     console.log(result);
// });
// node lib/index.js {hello}
const graphqlHTTP = require('express-graphql');

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

// connect mongodb and postgre at mean times
//MongoClient.connect(mConfig.url, (err, mPool) => {
    //assert.equal(err, null);
    // Logger.setLevel('debug');
    // Logger.filter('class', ['Server']);
    // const mdb = require('../database/mdb')(mPool);
    // mdb.getUsersByIds([1,2]).then(res => {
    //     console.log(res);
    // });

    app.use('/graphql', (req, res) => {
        const loaders = {
            usersByIds: new DataLoader(pgdb.getUsersByIds),
            usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
            namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
            contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
            totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
            activitiesForUserIds: new DataLoader(pgdb.getActivitiesForUserIds),
            //mongodb loader
            // mdb: {
            //     usersByIds: new DataLoader(mdb.getUsersByIds)
            // }
        };
        graphqlHTTP({
            schema: ncSchema,
            graphiql: true,
            context: { pgPool, loaders }
            //context: { pgPool, mPool, loaders }
        })(req, res)
    });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
//});
