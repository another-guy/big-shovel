import { MongoClient, MongoClientOptions } from 'mongodb';

import { MongoClientFactory } from './client-factory';

export function withMongoClient(
  options: { uri: string, options?: MongoClientOptions | undefined },
): (mongoClientConsumingFunction: (client: MongoClient) => void) => void {

  return function(mongoClientConsumingFunction: (client: MongoClient) => void) {
    new MongoClientFactory()
      .getClient(options.uri, options.options)
      .then(mongoClientConsumingFunction)
      .catch(error => console.log(error))
  }

}
