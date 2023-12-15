import { prisma } from '@/config';
import { Order } from '@prisma/client';
import { repositoryItem } from './item.repository';
import { notFoundError } from '@/errors';

async function getAllOrders() {
  const orders = await prisma.order.findMany();

  const ordersWithItensPromises = orders.map(async (order) => {
    const itensPromises = order.itensId.map(async (itemId) => {
      const item = await repositoryItem.getItemById(itemId);
      delete item.createdAt;
      delete item.updatedAt;

      return item;
    });

    const itens = await Promise.all(itensPromises);

    delete order.itensId;
    delete order.createdAt;
    delete order.updatedAt;

    return {
      ...order,
      itens,
    };
  });

  const ordersWithItens = await Promise.all(ordersWithItensPromises);

  return ordersWithItens;
}

async function createOrder(order: Order) {
  const res = await prisma.order.create({
    data: order,
  });

  delete res.itensId;
  delete res.createdAt;
  delete res.updatedAt;

  const itensPromises = order.itensId.map(async (itemId) => {
    const item = await repositoryItem.getItemById(itemId);

    if (!item) {
      throw notFoundError('Item not found or not available');
    }

    delete item.createdAt;
    delete item.updatedAt;

    await prisma.product.update({
      where: {
        id: item.productId,
      },
      data: {
        soldTimes: {
          increment: 1,
        },
      },
    });

    return item;
  });
  const itens = await Promise.all(itensPromises);

  const orderWithItens = {
    ...res,
    itens,
  };

  return orderWithItens;
}

async function cancelOrder(id: number) {
  await prisma.order.update({
    where: {
      id,
    },
    data: {
      orderStatus: 'CANCELED',
    },
  });
}

async function concludeOrder(id: number) {
  await prisma.order.update({
    where: {
      id,
    },
    data: {
      orderStatus: 'READY',
    },
  });
}

async function getOrderById(id: number) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  const itensPromises = order.itensId.map(async (itemId) => {
    const item = await repositoryItem.getItemById(itemId);

    delete item.createdAt;
    delete item.updatedAt;

    return item;
  });

  const itens = await Promise.all(itensPromises);

  delete order.itensId;
  delete order.createdAt;
  delete order.updatedAt;

  const orderWithItens = {
    ...order,
    itens,
  };

  return orderWithItens;
}

export const repositoryOrder = {
  getAllOrders,
  createOrder,
  cancelOrder,
  concludeOrder,
  getOrderById,
};
