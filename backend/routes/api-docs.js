"use strict";

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI  = require("swagger-ui-express");
const { Router } = require('express');
const  router = Router();
const logger = require('../service/logger');
const swaggerFile = require('../../swagger_output.json');


router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerFile));
logger.info(`📋 Version 1 docs are available at http://localhost:${process.env.PORT || 3000}/api-docs`);

module.exports = router;

