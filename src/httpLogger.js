const morgan = require('morgan');
const logger = require('./logger');

logger.stream = {
  write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

morgan.token('host', function getId (req) {
  return req.hostname
})

module.exports = morgan(
  ':method :host :url :status :response-time ms - :res[content-length]',
  { stream: logger.stream }
);
