import { getAllExtras } from '@/controllers/extra.controller';
import { Router } from 'express';

const extraRouter = Router();

extraRouter.get('/extras', getAllExtras);

export default extraRouter;
