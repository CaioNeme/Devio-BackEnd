import supertest from 'supertest';
import { dbClean } from '../helpers';
import app, { init, close } from '../../src/app';
import { createProduct } from '../factories/products.factory';

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

describe('GET /products', () => {
  it('should respond with status 200 and an empty array when there are no products', async () => {
    const response = await sever.get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
  it('should respond with status 200 and an array of products', async () => {
    const product = await createProduct();
    const response = await sever.get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product]);
  });
});
