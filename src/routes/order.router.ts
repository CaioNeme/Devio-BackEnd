import { getAllOrders } from '@/controllers/order.controllers';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/orders', getAllOrders);

export default orderRouter;
