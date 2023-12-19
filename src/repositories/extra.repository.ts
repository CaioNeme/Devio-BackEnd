import { prisma } from '@/config';

async function getAllExtras() {
  const extras = await prisma.extra.findMany();

  return extras;
}

async function getExtraById(id: number) {
  const extra = await prisma.extra.findUnique({
    where: {
      id,
    },
  });
  return extra;
}

export const repositoryExtra = {
  getAllExtras,
  getExtraById,
};
