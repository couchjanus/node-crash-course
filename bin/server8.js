// bin/server8.js
'use strict';
const express = require('express');
const port = 3000;
const app = express();

const fs = require('fs');
const path = require('path');

require('winston-daily-rotate-file');

app.use('/', require('../middlewares/app5'));

const { createLogger, format, transports } = require('winston');

// const logger = createLogger({
//   level: 'debug',
//   //   format: format.simple(),
//   // You can also comment out the line above and uncomment the line below for JSON format
//   format: format.json(),
//   transports: [new transports.Console()]
// });

// logger.info('Hello world');
// logger.debug('Debugging info');

// =================================
// const logger = createLogger({
//     // Change the level on the next line from 'debug' to 'silly' to enable messages logged
//     // with the silly logging threshold to be logged to the output.
//     level: 'silly',
//     //   format: format.simple(),
//     // You can also comment out the line above and uncomment the line below for JSON format
//     format: format.json(),
//     transports: [new transports.Console()]
//   });
  
//   logger.info('Hello world');
//   logger.debug('Debugging info');
//   logger.silly('Very verbose silly message');

// =================================
//   const logger = createLogger({
//     level: 'debug',
//     format: format.combine(format.colorize(), format.simple()),
//     transports: [new transports.Console()]
//   });
  
//   logger.info('Hello world');
//   logger.debug('Debugging info');

// ===================================

// const logger = createLogger({
//     level: 'debug',
//     format: format.combine(
//       format.colorize(),
//       format.timestamp({
//         format: 'YYYY-MM-DD HH:mm:ss'
//       }),
//       format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
//     ),
//     transports: [new transports.Console()]
//   });
  
//   logger.info('Hello world');
//   logger.debug('Debugging info');

// ===================================
  
const env = process.env.NODE_ENV || 'development';
const logDir = __dirname + '/../logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
// =========================================
// const filename = path.join(logDir, 'results.log');

// const logger = createLogger({
//   // change level if in dev environment versus production
//   level: env === 'development' ? 'debug' : 'info',
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss'
//     }),
//     format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
//   ),
//   transports: [
//     new transports.Console({
//       level: 'info',
//       format: format.combine(
//         format.colorize(),
//         format.printf(
//           info => `${info.timestamp} ${info.level}: ${info.message}`
//         )
//       )
//     }),
//     new transports.File({ filename })
//   ]
// });

// logger.info('Hello world');
// logger.warn('Warning message');
// logger.debug('Debugging info');

// ============================

// const filename = path.join(logDir, 'results.json');

// const logger = createLogger({
//   // change level if in dev environment versus production
//   level: env === 'development' ? 'debug' : 'info',
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss'
//     }),
//     format.json()
//   ),
//   transports: [
//     new transports.Console({
//       level: 'info',
//       format: format.combine(
//         format.colorize(),
//         format.printf(
//           info => `${info.timestamp} ${info.level}: ${info.message}`
//         )
//       )
//     }),
//     new transports.File({ filename })
//   ]
// });

// logger.info('Hello world');
// logger.warn('Warning message');
// logger.debug('Debugging info');

// =================================

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
  });
  
  const logger = createLogger({
    // change level if in dev environment versus production
    level: env === 'development' ? 'verbose' : 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message}`
          )
        )
      }),
      dailyRotateFileTransport
    ]
  });
  
  logger.debug('Debugging info');
  logger.verbose('Verbose info');
  logger.info('Hello world');
  logger.warn('Warning message');
  logger.error('Error info');
// =============================  

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

