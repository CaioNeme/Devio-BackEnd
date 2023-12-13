import { Router } from 'express';
import healthRouter from '@/routes/health.router';
import productRouter from '@/routes/product.router';
import orderRouter from '@/routes/order.router';

const router = Router();

router.use(healthRouter);
router.use(productRouter);
router.use(orderRouter);

export default router;
