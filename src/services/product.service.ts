import { repositoryProduct } from '@/repositories/product.repository';

async function getAllProducts() {
  const products = await repositoryProduct.getAllProducts();
  return products;
}

export const servicesProduct = {
  getAllProducts,
};
