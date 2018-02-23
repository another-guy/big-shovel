import { Request, Response } from 'express';

export interface RequestHandler {
  handle(request: Request, response: Response): void;
}
