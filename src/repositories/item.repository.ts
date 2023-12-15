import { prisma } from '@/config';
import { Item } from '@prisma/client';

async function createItem(item: Item) {
  const res = await prisma.item.create({
    data: item,
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
