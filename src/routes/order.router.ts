import { cancelOrder, concludeOrder, createOrder, getAllOrders, getOrderById } from '@/controllers/order.controller';
import { validateBody } from '@/middlewares/validationSchema';
import { createOrderSchema } from '@/schemas/order.schema';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/orders', getAllOrders);
orderRouter.post('/orders', validateBody(createOrderSchema), createOrder);
orderRouter.put('/orders/cancel/:id', cancelOrder);
orderRouter.put('/orders/conclude/:id', concludeOrder);
orderRouter.get('/orders/:id', getOrderById);

export default orderRouter;
