import { repositoryItem } from '@/repositories/item.repository';
import { Item } from '@prisma/client';

async function createItem(item: Item) {
  const res = await repositoryItem.createItem(item);
  return res;
}

async function getAllItems() {
  const items = await repositoryItem.getAllItems();
  return items;
}

async function getItemById(id: number) {
  const item = await repositoryItem.getItemById(id);
  return item;
}

async function cancelItem(id: number) {
  await repositoryItem.cancelItem(id);
}

async function concludeItem(id: number) {
  await repositoryItem.concludeItem(id);
}

export const servicesItem = {
  createItem,
  getAllItems,
  getItemById,
  cancelItem,
  concludeItem,
};
