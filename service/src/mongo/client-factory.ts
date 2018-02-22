import { MongoClient, MongoClientOptions } from 'mongodb';

export class MongoClientFactory {

  constructor(private attempts: number = 3, private delayMs: number = 3000) { }

  getClient(
    uri: string,
    options?: MongoClientOptions | undefined,
  ): Promise<MongoClient> {

    return new Promise<MongoClient>((resolve, reject) => {
      
      MongoClient.connect(uri, options)
        .then(resolve)
        .catch(error => {
          this.attempts--;

          console.info(`Could not create a client (attempts left: ${this.attempts})`, error);
          if (this.attempts <= 0)
            reject(error);
          else
            setTimeout(() => this.getClient(uri, options).then(resolve).catch(reject), this.delayMs);
        });

    });

  }

}
