import supertest from 'supertest';
import app, { close, init } from '../../src/app';
import { createExtra } from '../factories/extras.factory';
import { createItem, getItem } from '../factories/item.factory';
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

describe('GET /items', () => {
  it('should respond with status 200 and an empty array when there are no items', async () => {
    const response = await sever.get('/item');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
  it('should respond with status 200 and an array of items', async () => {
    const { item } = await createItem();
    const response = await sever.get('/item');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: item.id,
        note: item.note,
        quantity: item.quantity,
        paidPrice: item.paidPrice,
        productId: item.productId,
        extraId: item.extraId,
        status: item.status,
        productImage: item.productImage,
        productName: item.productName,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      },
    ]);
  });
  it('should respond with status 200 and an array of items with extra', async () => {
    const { item } = await createItem(true);
    const response = await sever.get('/item');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: item.id,
        note: item.note,
        quantity: item.quantity,
        paidPrice: item.paidPrice,
        productId: item.productId,
        extraId: item.extraId,
        status: item.status,
        productImage: item.productImage,
        productName: item.productName,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      },
    ]);
  });
});

describe('POST /item', () => {
  it('should respond with status 201 and create an item', async () => {
    const product = await createProduct();
    const item = {
      note: 'note',
      quantity: 1,
      paidPrice: 100,
      productId: product.id,
    };
    const response = await sever.post('/item').send(item);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: response.body.id,
    });
  });
  it('should respond with status 201 and create an item with extra', async () => {
    const product = await createProduct();
    const extra = await createExtra();
    const item = {
      note: 'note',
      quantity: 1,
      paidPrice: 100,
      productId: product.id,
      extraId: extra.id,
    };
    const response = await sever.post('/item').send(item);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: response.body.id,
    });
  });
  it('should respond with status 400 when item is invalid', async () => {
    const item = {
      quantity: 1,
      paidPrice: 100,
    };
    const response = await sever.post('/item').send(item);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "productId" is required ',
    });
  });
  it('should respond with status 400 when item is invalid', async () => {
    const item = {
      note: 'note',
      quantity: 1,
      paidPrice: 100,
    };
    const response = await sever.post('/item').send(item);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "productId" is required ',
    });
  });
  it('should respond with status 404 when product not found', async () => {
    const item = {
      note: 'note',
      quantity: 1,
      paidPrice: 100,
      productId: 1,
    };
    const response = await sever.post('/item').send(item);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Product not found or not available',
    });
  });
  it('should respond with status 404 when extra not found', async () => {
    const product = await createProduct();
    const item = {
      note: 'note',
      quantity: 1,
      paidPrice: 100,
      productId: product.id,
      extraId: 1,
    };
    const response = await sever.post('/item').send(item);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Extra not found or not available',
    });
  });
});

describe('GET /item/:id', () => {
  it('should respond with status 200 and an item', async () => {
    const { item } = await createItem();
    const response = await sever.get(`/item/${item.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: item.id,
      note: item.note,
      quantity: item.quantity,
      paidPrice: item.paidPrice,
      productId: item.productId,
      extraId: item.extraId,
      status: item.status,
      productImage: item.productImage,
      productName: item.productName,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    });
  });
  it('should respond with status 404 when item not found', async () => {
    const response = await sever.get('/item/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});

describe('Cancel /item/:id', () => {
  it('should respond with status 200 and an item', async () => {
    const { item } = await createItem();
    const response = await sever.put(`/item/cancel/${item.id}`);

    const updatedItem = await getItem(item.id);

    expect(response.status).toBe(200);
    expect(updatedItem).toEqual({
      id: item.id,
      note: item.note,
      quantity: item.quantity,
      paidPrice: item.paidPrice,
      productId: item.productId,
      extraId: item.extraId,
      status: 'CANCELED',
      productImage: item.productImage,
      productName: item.productName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  });
  it('should respond with status 404 when item not found', async () => {
    const response = await sever.put('/item/cancel/1');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
  it('should respond with status 400 when order a ready conclude', async () => {
    const { item } = await createItem();
    await sever.put(`/item/conclude/${item.id}`);
    const response = await sever.put(`/item/cancel/${item.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Item already done' });
  });
  it('should respond with status 400 when order a ready cancel', async () => {
    const { item } = await createItem();
    await sever.put(`/item/cancel/${item.id}`);
    const response = await sever.put(`/item/cancel/${item.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Item already canceled' });
  });
});

describe('Conclude /item/:id', () => {
  it('should respond with status 200 and an item', async () => {
    const { item } = await createItem();
    const response = await sever.put(`/item/conclude/${item.id}`);
    const updatedItem = await getItem(item.id);

    expect(response.status).toBe(200);
    expect(updatedItem).toEqual({
      id: item.id,
      note: item.note,
      quantity: item.quantity,
      paidPrice: item.paidPrice,
      productId: item.productId,
      extraId: item.extraId,
      status: 'DONE',
      productImage: item.productImage,
      productName: item.productName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  });
  it('should respond with status 404 when item not found', async () => {
    const response = await sever.put('/item/conclude/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
  it('should respond with status 400 when order a ready conclude', async () => {
    const { item } = await createItem();
    await sever.put(`/item/conclude/${item.id}`);
    const response = await sever.put(`/item/conclude/${item.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Item already done' });
  });
  it('should respond with status 400 when order a ready cancel', async () => {
    const { item } = await createItem();
    await sever.put(`/item/cancel/${item.id}`);
    const response = await sever.put(`/item/conclude/${item.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Item already canceled' });
  });
});
