import { Request, Response, Router } from 'express';
import { Db, MongoClient } from 'mongodb';

import { parseObjectFromString } from '../mongo/query-string-parse';

let database: Db;
MongoClient
  .connect('mongodb://localhost:27017/')
  .then(mongoClient => database = mongoClient.db('myTestDb'))
  .catch(error => console.log(error));

const router = Router();

router
  .get('/', async (request: Request, response: Response) => {
    const queryObject = parseObjectFromString(request.query.q);
    const sortObject = parseObjectFromString(request.query.s) || { "payload.eventTimeStamp": 1 };

    let foundEntries = await database
      .collection('myLogCollection')
      .find(queryObject)
      .sort(sortObject)
      .toArray();

    console.info(`Request ${ JSON.stringify(queryObject) } results in ${ foundEntries.length } entr${ foundEntries.length === 1 ? 'y' : 'ies' }.`);

    response.status(200).send(foundEntries);
  })

export const MongoQueryController: Router = router;