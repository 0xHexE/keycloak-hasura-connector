const { createLogger, transports, format } = require('winston');

function serializeMeta(info) {
  return JSON.stringify(Object.assign({}, info, {
    level: undefined,
    message: undefined,
    splat: undefined,
    label: undefined,
    timestamp: undefined
  }));
}

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message} - ${serializeMeta(info)}`)
  ),
  transports: [
    new transports.File({ 
      filename: './logs/error.log', 
      level: 'error',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
});

module.exports = logger;