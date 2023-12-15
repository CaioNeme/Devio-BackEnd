import { prisma } from '@/config';
import { faker } from '@faker-js/faker';

export async function createProduct() {
  const product = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 100, max: 1000 }),
      image: faker.image.url(),
      productType: 'BURGUER',
    },
  });

  return product;
}
