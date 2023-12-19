import supertest from 'supertest';
import app, { close, init } from '../../src/app';
import { createProduct } from '../factories/products.factory';
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
    expect(response.body).toEqual([
      {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        productType: product.productType,
        soldTimes: product.soldTimes,
        price: product.price,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      },
    ]);
  });
});

describe('GET /products/:name', () => {
  it('should respond with status 200 and an product', async () => {
    const product = await createProduct();
    const response = await sever.get(`/products/${product.name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      productType: product.productType,
      soldTimes: product.soldTimes,
      price: product.price,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    });
  });

  it('should respond with status 404 when product not found', async () => {
    const response = await sever.get('/products/1');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Product not found or not available',
    });
  });
});
