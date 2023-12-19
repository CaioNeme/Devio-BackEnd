import { prisma } from '@/config';
import { servicesProduct } from '@/services/product.service';
import { Item } from '@prisma/client';

async function createItem(item: Item) {
  const product = await servicesProduct.getProductById(item.productId);

  const res = await prisma.item.create({
    data: {
      ...item,
      productImage: product.image,
      productName: product.name,
    },
  });
  return res;
}

async function getAllItems() {
  const items = await prisma.item.findMany();
  return items;
}

async function getItemById(id: number) {
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });

  return item;
}

async function cancelItem(id: number) {
  await prisma.item.update({
    where: {
      id,
    },
    data: {
      status: 'CANCELED',
    },
  });
}

async function concludeItem(id: number) {
  await prisma.item.update({
    where: {
      id,
    },
    data: {
      status: 'DONE',
    },
  });
}

export const repositoryItem = {
  createItem,
  getAllItems,
  getItemById,
  cancelItem,
  concludeItem,
};
