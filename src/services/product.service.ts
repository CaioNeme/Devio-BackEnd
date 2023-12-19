import { notFoundError } from '@/errors';
import { repositoryProduct } from '@/repositories/product.repository';

async function getAllProducts() {
  const products = await repositoryProduct.getAllProducts();
  return products;
}

async function getProductById(id: number) {
  const product = await repositoryProduct.getProductById(id);

  if (!product) {
    throw notFoundError('Product not found or not available');
  }

  return product;
}

async function getProductByName(name: string) {
  const product = await repositoryProduct.getProductByName(name);

  if (!product) {
    throw notFoundError('Product not found or not available');
  }

  return product;
}

export const servicesProduct = {
  getProductByName,
  getAllProducts,
  getProductById,
};
