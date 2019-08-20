import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import logger from 'morgan'
import errorHandler from 'errorhandler'
import path from 'path'
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const csrf = require('csurf');

export const start = ({routes, port=3000, env='development'}) => () => {
    return new Promise((resolve, reject) => {
        const app = express()

        app.set('port', port)
        app.use(logger('dev'))

        app.use('/static', express.static(__dirname + '/../../public/assets'));
        app.set('views', path.join(__dirname, '/../../views'));
        app.set('view engine', 'pug');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(csrf({ cookie: true }))

        app.use(function(req, res, next){
            res.locals.csrfToken = req.csrfToken();
            next();
        });

        if (env === 'development') {
            app.use(errorHandler())
        }
        
        app.use(routes);

        app.listen(app.get('port'), () => {
            return resolve(successMessage({ port }))
        })
    })
}

export default { start }

function successMessage(vars) {
    let icon    = chalk.bold.green('✔︎')
    let url     = chalk.green.bold.underline(`http://localhost:${vars.port}`)
    let stopMsg = chalk.dim.italic(`     Press CTRL-C to stop`)
    let message = `  ${icon}  API server running at ${url}\n\n${stopMsg}\n`
    return message
}
