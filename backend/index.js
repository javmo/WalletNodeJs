const app = require('./app');
const logger = require('./service/logger');

app.listen(process.env.PORT || 3000);
console.log('Server on port',process.env.PORT || 3000);
logger.info('Server on port ' + `${process.env.PORT || 3000}`);

