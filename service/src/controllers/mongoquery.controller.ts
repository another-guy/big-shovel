import { Request, Response, Router } from 'express';
import { MongoClient, Db } from 'mongodb';

let database: Db;
MongoClient
  .connect('mongodb://localhost:27017/')
  .then(mongoClient => database = mongoClient.db('myTestDb'))
  .catch(error => console.log(error));

const router = Router();

router
  .get('/', async (request: Request, response: Response) => {
    const queryObject = JSON.parse(request.query.q);

    const foundEntreis = await database
      .collection('myLogCollection')
      .find(queryObject)
      .toArray();

    console.info(`Request ${ JSON.stringify(queryObject) } results in ${ foundEntreis.length } entr${ foundEntreis.length === 1 ? 'y' : 'ies' }.`);

    response.status(200).send(foundEntreis);
  })

export const MongoQueryController: Router = router;