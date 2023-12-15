import { Router } from 'express';
import healthRouter from '@/routes/health.router';
import productRouter from '@/routes/product.router';
import orderRouter from '@/routes/order.router';
import itemRouter from '@/routes/item.routers';
import extraRouter from '@/routes/extra.router';

const router = Router();

router.use(healthRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(itemRouter);
router.use(extraRouter);

export default router;
