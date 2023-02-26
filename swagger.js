const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'
const endpointsFiles = ['./backend/app.js']

//Swagger documentation
const swaggerOptions = {
    info: {
        version: "1.0.0",
        title: "Docu API",
        description: "API Documentation for use",
        contact: {
            name: "Javier Morixe",
            url: "https://www.linkedin.com/in/javier-morixe-114114101/"
        },
    },
    host: "localhost:3000",
    basePath: "/",
    tags: [
        {
            "name": "account",
            "description": "Endpoints"
        },
        {
            "name": "exchange",
            "description": "Endpoints"
        },
        {
            "name": "owner",
            "description": "Endpoints"
        },
        {
            "name": "wallet",
            "description": "Endpoints"
        },
    ],
};




swaggerAutogen(outputFile, endpointsFiles, swaggerOptions).then(() => {
    require('./backend/index.js')
})


