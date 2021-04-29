const { createLogger, format, transports } = require('winston');
const { timestamp, combine } = format;
const emoji = require('node-emoji');

const logFormat = format.printf(({level, message, timestamp, stack}) => {
    return `[${timestamp}] ${level} ${stack || emoji.emojify(message)}`;
});

const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({stack: true}),
        logFormat),
    transports: [new transports.Console()],
});

module.exports = logger;

/*
module.exports = createLogger ({
    format: format.combine(
        format.simple(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'debug'
        })
    ]
})*/
