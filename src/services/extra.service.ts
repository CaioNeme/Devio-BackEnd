import { notFoundError } from '@/errors';
import { repositoryExtra } from '@/repositories/extra.repository';

async function getAllExtras() {
  const extras = await repositoryExtra.getAllExtras();
  return extras;
}

async function getExtraById(id: number) {
  const extra = await repositoryExtra.getExtraById(id);
  if (!extra) {
    throw notFoundError('Extra not found or not available');
  }
  return extra;
}

export const servicesExtra = {
  getAllExtras,
  getExtraById,
};
