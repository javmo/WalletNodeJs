"use strict";

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI  = require("swagger-ui-express");
const { Router } = require('express');
const  router = Router();
const logger = require('../service/logger');


//Swagger documentation
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version: "1.0.0",
            title: "Docu API",
             description: "API Documentation for use",
            contact:{
                name: "Javier Morixe",
                url: "https://www.linkedin.com/in/javier-morixe-114114101/"
             },
        },
        
        },
    //APIS a documentar
     apis: ["backend/routes/account.routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/", swaggerUI.serve, swaggerUI. setup(swaggerDocs));
logger.info(`📋 Version 1 docs are available at http://localhost:${process.env.PORT || 3000}/api-docs`);

module.exports = router;

