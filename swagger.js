const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 
const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API',
  },
  host: 'lemos-cse341-personal.onrender.com',
  schemes: ['https'],
  //host: 'localhost',
  //schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
