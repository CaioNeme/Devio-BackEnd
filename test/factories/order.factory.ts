import { faker } from '@faker-js/faker';
import { createItem } from './item.factory';
import { prisma } from '@/config';

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

export async function getOrder(id: number) {
  return prisma.order.findUnique({ where: { id } });
}
