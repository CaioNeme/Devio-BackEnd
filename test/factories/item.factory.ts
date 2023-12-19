import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import { createExtra } from './extras.factory';
import { createProduct } from './products.factory';

export async function createItem(isExtra: boolean = false) {
  const product = await createProduct();
  const extra = await createExtra();

  const item = await prisma.item.create({
    data: {
      note: faker.lorem.sentence(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      paidPrice: faker.number.int({ min: 100, max: 1000 }),
      productId: product.id,
      productImage: product.image,
      productName: product.name,
      extraId: isExtra ? extra.id : null,
    },
  });

  return { item, product, extra };
}

export async function getItem(id: number) {
  return prisma.item.findUnique({ where: { id } });
}
