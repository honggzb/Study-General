[node + swagger](#top)

- [Swagger Tools](#swagger-tools)
- [Node Swagger setup](#node-swagger-setup)
- [Add Swagger To NodeJS REST API](#add-swagger-to-nodejs-rest-api)

---------------------------------------------------------

- OPEN API Specification(OAS)

## Swagger Tools

- [swagger Editor](https://editor.swagger.io/)
- [swagger UI](https://swagger.io/tools/swagger-ui/)
- [swagger Codegen](https://swagger.io/tools/swagger-codegen/)
- https://github.com/swagger-api

## Node Swagger setup

- [official document](https://github.com/swagger-api/swagger-node/blob/fc777a61ccaf54076d0a3ffcfafedc347abc15ba/docs/quick-start.md)
- `npm i swagger -g`
- `swagger project create mySwagger`
- `npm i yamljs swagger-ui-express`

[⬆ back to top](#top)

## Add Swagger To NodeJS REST API

1. `npm i swagger-autogen swagger-ui-express`
2. create 'docs' folder in root directory
3. create a 'swagger.js' file inside the 'docs' folder

```javascript
/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

const config = require('../config/cloud');
const swaggerAutogen = require('swagger-autogen')();
const msg = require('../utils/lang/messages');

const doc = {
  info: {
    version: '2.0.0',      // by default: '1.0.0'
    title: 'CloudAgent Apis',        // by default: 'REST API'
    description: 'API for Managing queue calls',  // by default: ''
    contact: {
        'name': 'API Support',
        'email': 'rajputankit22@gmail.com'
    },
  },
  host: config.swagger.host,      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: 'Queue CRUD',         // Tag name
      description: 'Queue related apis',  // Tag description
    },
    {
        name: 'Health',
        description: 'Health Check'
    }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {
    helathResponse: {
      code: msg.response.CAG001.code,
      message: msg.response.CAG001.message,
    },
    'errorResponse.400': {
      code: msg.response.CAGE002.code,
      message: msg.response.CAGE002.message,
    },
    'errorResponse.403': {
      code: msg.response.CAGE001.code,
      message: msg.response.CAGE001.message,
    },
    'errorResponse.404': {
      "code": "404",
      "message": "Not found",
    },
    'errorResponse.500': {
      code: msg.response.CAGE003.code,
      message: msg.response.CAGE003.message,
    }
  },          // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js', './controllers/*.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
```

4. add command to 'package.json' file
   - `"swagger-autogen": "node ./docs/swagger.js",  // Add this line inside the scripts object`
5. `npm run swagger-autogen` to generate the `swagger.json` in 'docs' folder
6. this is the sample for the health controller

```javascript
//api for health checkup
exports.health = async (req, res) => {
 /* 
 #swagger.tags = ['Health']
 #swagger.summary = 'This is the health API.'
 #swagger.description = 'This API response tells us service is up or down.'
 #swagger.consumes = ['application/json']
 #swagger.produces = ['application/json']
 #swagger.responses[200] = {
  description: 'Service is',
  schema: { $ref: '#/definitions/helathResponse' }
 }
 #swagger.responses[500] = {
  description: 'Server Issue',
  schema: { $ref: '#/definitions/errorResponse.500' }
 }
 #swagger.responses[404] = {
  description: 'Not found',
  schema: { $ref: '#/definitions/errorResponse.404' }
 }
  */
 res.send({
  code: msg.response.CAG001.code,
  message: msg.response.CAG001.message,
 });
}
```

7. re-run `npm run swagger-autogen` to re-generate the `swagger.json`
8. add following in 'app.js'
9. run your app and hit the `HTTP:localhost:3001/api-docs/`

```javascript
 const swaggerUi = require('swagger-ui-express');
 const swaggerDocument = require('./docs/swagger.json');
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

> [How To Add Swagger To NodeJS REST API](https://rajputankit22.medium.com/how-to-add-swagger-to-nodejs-rest-api-7caa870741be)
> [Documenting your Express API with Swagger](https://blog.logrocket.com/documenting-express-js-api-swagger/)
