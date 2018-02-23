import { Request, Response } from 'express';

import { parseObjectFromString } from '../../mongo/query-string-parse';
import { withMongoClient } from '../../mongo/with-client';
import { mongoClientOptions } from '../mongo-options';
import { RequestHandler } from './handler';

export class GetLogsHandler implements RequestHandler {
  handle(request: Request, response: Response): void {
    withMongoClient(mongoClientOptions)
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
  }
}