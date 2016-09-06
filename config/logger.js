var winston = require('winston');
var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)(),
    new(winston.transports.File)({
      name: 'info-file',
      filename: './logs/filelog-info.log',
      level: 'info'
    }),
    new(winston.transports.File)({
      name: 'error-file',
      filename: './logs/filelog-error.log',
      level: 'error'
    })
  ],
  msg: 'HTTP {{req.method}} {{req.url}}',
  colorize: true
});

module.exports = logger;
