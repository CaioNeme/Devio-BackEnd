import { Router } from 'express';
import { getAllExtras } from '@/controllers/extra.controller';

const extraRouter = Router();

extraRouter.get('/extras', getAllExtras);

export default extraRouter;
