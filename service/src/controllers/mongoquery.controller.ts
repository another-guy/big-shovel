import { Request, Response, Router } from 'express';

const router = Router();

router
  .get('/', (req: Request, res: Response) => {
    const query = req.query.q;

    res.send(`Hello ${query}`);
  })

export const MongoQueryController: Router = router;