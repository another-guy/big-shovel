import { Request, Response, NextFunction } from 'express';

export interface RequestHandler {
  handle(request: Request, response: Response, next: NextFunction): void;
}
