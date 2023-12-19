import supertest from 'supertest';
import app, { close, init } from '../../src/app';
import { createExtra } from '../factories/extras.factory';
import { dbClean } from '../helpers';

const sever = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await dbClean();
});

afterAll(async () => {
  await close();
});

describe('GET /extras', () => {
  it('should respond with status 200 and an empty array when there are no extras', async () => {
    const response = await sever.get('/extras');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should respond with status 200 and an array of extras', async () => {
    const extra = await createExtra();
    const response = await sever.get('/extras');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: extra.id,
        name: extra.name,
        description: extra.description,
        price: extra.price,
        productType: extra.productType,
        image: extra.image,
        createdAt: extra.createdAt.toISOString(),
        updatedAt: extra.updatedAt.toISOString(),
      },
    ]);
  });
});
