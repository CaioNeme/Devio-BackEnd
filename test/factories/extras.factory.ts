import { faker } from '@faker-js/faker';
import { prisma } from '@/config';

export async function createExtra() {
  const extra = await prisma.extra.create({
    data: {
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 100, max: 1000 }),
      description: faker.commerce.productDescription(),
      productType: 'BURGUER',
    },
  });

  delete extra.createdAt;
  delete extra.updatedAt;

  return extra;
}