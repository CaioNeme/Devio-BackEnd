import { prisma } from '@/config';

async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export const repositoryProduct = {
  getAllProducts,
};
