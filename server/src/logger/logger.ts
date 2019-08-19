import * as winston from 'winston';

namespace namespacelogger  {

    export function loggerDebug():winston.Logger {
        return winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console({level: 'info'}),
                new winston.transports.File({
                    filename: 'debug.log',
                    level: 'info'
                })
            ],
        });
    }
    export function loggerError():winston.Logger {
        return winston.createLogger({
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console({
                    level: 'error'
                }),
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'error'
                })
            ],
        });
    }

}


export default namespacelogger;