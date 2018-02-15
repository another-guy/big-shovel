import * as express from 'express';

import { MongoQueryController } from './controllers/mongoquery.controller';

const app: express.Application = express();
const port = (process.env.PORT || 3000) as number;

app.use('/mongo', MongoQueryController);
app.use('/', (request, response) => { response.status(200).send('Up-n-running'); });

const timestamp = new Date();
app.listen(port, () => console.log(`Listening at http://localhost:${port}/ since ${timestamp.toLocaleString()} (Local Time)`));