import { Request, Response } from 'express';
import { servicesOrder } from '@/services/order.service';

export async function getAllOrders(_req: Request, res: Response) {
  const orders = await servicesOrder.getAllOrders();
  res.status(200).send(orders);
}

export async function createOrder(req: Request, res: Response) {
  const order = await servicesOrder.createOrder(req.body);
  res.status(201).send(order);
}

export async function cancelOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  await servicesOrder.cancelOrder(id);
  res.sendStatus(200);
}

export async function concludeOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  await servicesOrder.concludeOrder(id);
  res.sendStatus(200);
}

export async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const order = await servicesOrder.getOrderById(id);
  res.status(200).send(order);
}
