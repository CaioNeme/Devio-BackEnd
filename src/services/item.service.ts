import { badRequest, notFoundError } from '@/errors';
import { repositoryItem } from '@/repositories/item.repository';
import { Item } from '@prisma/client';

async function createItem(item: Item) {
  const product = await repositoryItem.getItemById(item.productId);
  if (!product) {
    throw badRequest('Product not found or not available');
  }

  if (item.extraId) {
    const extra = await repositoryItem.getItemById(item.extraId);
    if (!extra) {
      throw badRequest('Extra not found or not available');
    }
  }

  const res = await repositoryItem.createItem(item);
  return res;
}

async function getAllItems() {
  const items = await repositoryItem.getAllItems();
  return items;
}

async function getItemById(id: number) {
  const item = await repositoryItem.getItemById(id);

  if (!item) {
    throw notFoundError('Item not found');
  }

  return item;
}

async function cancelItem(id: number) {
  const item = await getItemById(id);

  if (item.status === 'CANCELED') {
    throw badRequest('Item already canceled');
  }
  if (item.status === 'DONE') {
    throw badRequest('Item already done');
  }

  await repositoryItem.cancelItem(id);
}

async function concludeItem(id: number) {
  const item = await getItemById(id);

  if (item.status === 'CANCELED') {
    throw badRequest('Item already canceled');
  }
  if (item.status === 'DONE') {
    throw badRequest('Item already done');
  }

  await repositoryItem.concludeItem(id);
}

export const servicesItem = {
  createItem,
  getAllItems,
  getItemById,
  cancelItem,
  concludeItem,
};
