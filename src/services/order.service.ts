import { repositoryOrder } from '@/repositories/order.repository';

async function getAllOrders() {
  const orders = await repositoryOrder.getAllOrders();
  return orders;
}

export const servicesOrder = {
  getAllOrders,
};
