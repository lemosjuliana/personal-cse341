const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Update this with the correct path to your routes file

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API',
  },
  //host: 'lemos-cse341-node.onrender.com',
  //schemes: ['https'],
  host: 'localhost',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
