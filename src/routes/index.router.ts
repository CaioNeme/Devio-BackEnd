import { Router } from 'express';
import healthRouter from './health.router';
import productRouter from './product.router';

const router = Router();

router.use(healthRouter);
router.use(productRouter);

export default router;
