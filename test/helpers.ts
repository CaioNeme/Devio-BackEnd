import { prisma } from '@/config';

export async function dbClean() {
  await prisma.order.deleteMany({});
  await prisma.extra.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.product.deleteMany({});
}
