import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import helmet from 'helmet';
import dumpService from './lib/dump-service'
import _routes_ from './routes';
import Constants from './config/constants';
import config from './config/config.js'

let routes = _routes_(config)

let app = express();


// Adds some security best practices
app.use(helmet());
app.use(cors());

// Logger
//if (!Constants.envs.test) {
  app.use(morgan('dev'));
//}

// Properly Decode JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add all HTTP methods
app.use(methodOverride());

// Mount API routes
app.use('/', routes);

// Only use error handler in development
// if (Constants.envs.development) {
//   app.use(errorHandler());
// }

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

dumpService.startService(config)


// function timpedloop () {
//   setTimeout(function () {
//   console.log(dumpService.data.length)
//   timpedloop ()
// }, 2000);
// }

// timpedloop ()

//updateDump()
export default app;
