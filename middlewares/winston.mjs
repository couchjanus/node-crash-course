import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const env = process.env.NODE_ENV || 'development';
const logDir = __dirname + '/../logs';

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'app.log');


const logger = winston.createLogger({
    // change level if in dev environment versus production
    level: env === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
    //   format.label({ label: path.basename(process.mainModule.filename) }),
      winston.format.label({ label: path.basename(__filename) }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
            info =>
              `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
          )
        )
      }),
      new winston.transports.File({
        filename,
        format: winston.format.combine(
            winston.format.printf(
            info =>
              `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
          )
        )
      })
    ]
  });

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

export default logger;
