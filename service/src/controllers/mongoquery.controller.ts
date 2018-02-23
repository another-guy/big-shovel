import { Router } from 'express';

import { GetAggregateHandler } from './handlers/get-aggregate-handler';
import { GetLogsHandler } from './handlers/get-logs-handler';

export const MongoQueryController: Router =
  Router()
    .get('/timeseries', new GetLogsHandler().handle)
    .get('/aggregate', new GetAggregateHandler().handle);
