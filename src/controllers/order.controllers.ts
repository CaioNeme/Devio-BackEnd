import { Request, Response } from 'express';
import { servicesOrder } from '@/services/order.service';

export async function getAllOrders(req: Request, res: Response) {
  const orders = await servicesOrder.getAllOrders();
  res.status(200).send(orders);
}
