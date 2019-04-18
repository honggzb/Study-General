const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const app = require('express')();

// read the query from the command line argument
//const query = process.argv[2];

const ncSchema = require('../schema');
const { graphql } = require('graphql');

// execute the query against the defined server schema
// graphql(ncSchema, query).then(result => {
//     console.log(result);
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})