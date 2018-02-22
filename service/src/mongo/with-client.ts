import { MongoClient, MongoClientOptions } from 'mongodb';

import { MongoClientFactory } from './client-factory';

export function withMongoClient(
  options: { uri: string, options?: MongoClientOptions | undefined },
) {
  return function(fn: (client: MongoClient) => void) {
    new MongoClientFactory()
      .getClient(options.uri, options.options)
      .then(fn)
      .catch(error => console.log(error))
  }
}
