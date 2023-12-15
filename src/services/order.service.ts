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
  await repositoryOrder.cancelOrder(id);
}

async function concludeOrder(id: number) {
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
