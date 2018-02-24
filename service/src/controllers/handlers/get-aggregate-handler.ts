import { NextFunction, Request, Response } from 'express';

import { parseObjectFromString } from '../../mongo/query-string-parse';
import { withMongoClient } from '../../mongo/with-client';
import { mongoClientOptions } from '../mongo-options';
import { RequestHandler } from './handler';

export class GetAggregateHandler implements RequestHandler {
  handle(request: Request, response: Response, next: NextFunction): void {
    withMongoClient(mongoClientOptions)
      (async client => {
        try {
          const pipeline = parseObjectFromString(request.query.p);

          // TODO Extract db & collection to `shovel.config.js`
          const resultEntries = await client
            .db('myTestDb')
            .collection('myLogCollection')
            .aggregate(pipeline)
            .toArray();

          console.info(`Aggregation request ${ JSON.stringify(pipeline) } results in ${ resultEntries.length } entr${ resultEntries.length === 1 ? 'y' : 'ies' }.`);

          response.status(200).send(resultEntries);
        } catch (error) {
          next(error);
        } finally {
          client.close(true).then(() => console.info(`Connection closed.`));
        }
      });
  }
}
