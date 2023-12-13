import { prisma } from '@/config';

async function getAllOrders() {
  const orders = await prisma.order.findMany();
  return orders;
}

export const repositoryOrder = {
  getAllOrders,
};
