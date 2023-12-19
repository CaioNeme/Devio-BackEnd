import { badRequest } from '@/errors';
import { repositoryOrder } from '@/repositories/order.repository';
import { Order } from '@prisma/client';

async function getAllOrders() {
  const orders = await repositoryOrder.getAllOrders();
  return orders;
}

async function createOrder(order: Order) {
  const res = await repositoryOrder.createOrder(order);
  return res;
}

async function cancelOrder(id: number) {
  const order = await repositoryOrder.getOrderById(id);
  if (order.orderStatus === 'CANCELED') {
    throw badRequest('Order already canceled');
  }

  await repositoryOrder.cancelOrder(id);
}

async function concludeOrder(id: number) {
  const order = await repositoryOrder.getOrderById(id);
  if (order.orderStatus === 'CANCELED') {
    throw badRequest('Order already canceled');
  }
  if (order.orderStatus === 'READY') {
    throw badRequest('Order already ready');
  }

  await repositoryOrder.concludeOrder(id);
}

async function getOrderById(id: number) {
  const order = await repositoryOrder.getOrderById(id);

  return order;
}

export const servicesOrder = {
  getAllOrders,
  createOrder,
  cancelOrder,
  concludeOrder,
  getOrderById,
};
