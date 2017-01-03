import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import helmet from 'helmet';

import getDump from './lib/get-dump'

import routes from './routes';
import Constants from './config/constants';
//import './database';

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


// a self fulfilling promise 
function updateDump () {
  getDump('http://piaware.local:8080/dump1090/data.json').then(function(r){
    console.log(JSON.parse(r))
    updateDump ()
  })  
}


//updateDump()
export default app;
