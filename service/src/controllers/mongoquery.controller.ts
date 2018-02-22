import { Request, Response, Router } from 'express';

import { parseObjectFromString } from '../mongo/query-string-parse';
import { withMongoClient } from '../mongo/with-client';

const router = Router();

router
  .get('/', (request: Request, response: Response) => {
    withMongoClient({ uri: 'mongodb://localhost:27017/' })
      (async client => {
        const queryObject = parseObjectFromString(request.query.q);
        const sortObject = parseObjectFromString(request.query.s) || { };

        const foundEntries = await client
          .db('myTestDb')
          .collection('myLogCollection')
          .find(queryObject)
          .sort(sortObject)
          .toArray();

        console.info(`Request ${ JSON.stringify(queryObject) } results in ${ foundEntries.length } entr${ foundEntries.length === 1 ? 'y' : 'ies' }.`);

        response.status(200).send(foundEntries);
      });
  });

export const MongoQueryController: Router = router;