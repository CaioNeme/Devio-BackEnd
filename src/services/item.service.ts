import { Item } from '@prisma/client';
import { servicesExtra } from './extra.service';
import { badRequest, notFoundError } from '@/errors';
import { repositoryItem } from '@/repositories/item.repository';
import { repositoryProduct } from '@/repositories/product.repository';

async function createItem(item: Item) {
  const product = await repositoryProduct.getProductById(item.productId);
  if (!product) {
    throw notFoundError('Product not found or not available');
  }

  if (item.extraId) {
    await servicesExtra.getExtraById(item.extraId);
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
