import * as express from 'express';

import { MongoQueryController } from './controllers/mongoquery.controller';

const port = (process.env.PORT || 3000) as number;

const timestamp = new Date();

express()
  // CORS
  .use((request, response, nextFunction) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    nextFunction();
  })
  // Add controllers
  .use('/mongo', MongoQueryController)
  .use('/', (request, response) => { response.status(200).send('Up-n-running'); })
  // Start
  .listen(port, () => console.log(`Listening at http://localhost:${port}/ since ${timestamp.toLocaleString()} (Local Time)`));