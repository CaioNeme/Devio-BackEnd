import { prisma } from '@/config';
import { createItem } from './item.factory';
import { faker } from '@faker-js/faker';

export async function createOrder(isExtra: boolean = false) {
  const { item } = await createItem(isExtra);

  const order = await prisma.order.create({
    data: {
      clientName: faker.person.fullName(),
      paymentMethod: 'CREDIT',
      itensId: [item.id],
    },
  });

  return { order, item };
}
