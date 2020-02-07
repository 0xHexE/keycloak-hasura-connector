import { createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, prettyPrint } = format;
const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    prettyPrint(),
    colorize()
  ),
  transports: [
    new transports.Console({
      format: combine(timestamp(), colorize(), format.simple()),
      level: 'debug',
    }),
  ],
});

export default logger;
