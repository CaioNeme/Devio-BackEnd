import { prisma } from '@/config';
import { faker } from '@faker-js/faker';

export async function createExtra() {
  const extra = await prisma.extra.create({
    data: {
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 100, max: 1000 }),
      description: faker.commerce.productDescription(),
      productType: 'BURGUER',
    },
  });
  return extra;
}
