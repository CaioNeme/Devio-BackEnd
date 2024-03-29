import { prisma } from '@/config';

async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      soldTimes: 'desc',
    },
  });
  return products;
}

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
}

async function getProductByName(name: string) {
  const product = await prisma.product.findUnique({
    where: {
      name,
    },
  });
  return product;
}

export const repositoryProduct = {
  getAllProducts,
  getProductById,
  getProductByName,
};
