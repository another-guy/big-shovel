import { RequestHandler } from './handler';
import { Request, Response } from 'express';

export class GetAggregateHandler implements RequestHandler {
  handle(request: Request, response: Response): void {
    throw new Error("Method not implemented.");
  }
}
