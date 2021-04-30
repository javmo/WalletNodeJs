const mongoose = require('mongoose');
const logger = require('./service/logger');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
})
    .then(db => logger.info(':tada: DB is connected'))
    .catch(err => logger.error(`:fire: ${err}`))
