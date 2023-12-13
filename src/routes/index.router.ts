import { Router } from 'express';
import healthRouter from './health.router';

const router = Router();

router.use(healthRouter);

export default router;
