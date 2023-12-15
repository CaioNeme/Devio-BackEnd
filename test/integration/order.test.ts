import supertest from 'supertest';
import { dbClean } from '../helpers';
import app, { init, close } from '../../src/app';
import { createItem } from '../factories/item.factory';
import { createOrder } from '../factories/order.factory';

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

describe('GET /orders', () => {
  it('should respond with status 200 and an empty array when there are no orders', async () => {
    const response = await sever.get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should respond with status 200 and an array of orders', async () => {
    const { order, item } = await createOrder();

    const response = await sever.get('/orders');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: order.id,
          clientName: order.clientName,
          paymentMethod: order.paymentMethod,
          orderStatus: order.orderStatus,
          itens: expect.arrayContaining([
            {
              id: item.id,
              note: item.note,
              quantity: item.quantity,
              paidPrice: item.paidPrice,
              productId: item.productId,
              extraId: item.extraId,
              status: item.status,
            },
          ]),
        },
      ]),
    );
  });
});

describe('POST /orders', () => {
  it('should respond with status 201 and create an order', async () => {
    const { item } = await createItem();
    const order = {
      clientName: 'clientName',
      paymentMethod: 'CREDIT',
      itensId: [item.id],
    };

    const response = await sever.post('/orders').send(order);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      clientName: order.clientName,
      paymentMethod: order.paymentMethod,
      orderStatus: 'PROCESSING',
      itens: expect.arrayContaining([
        {
          id: item.id,
          note: item.note,
          quantity: item.quantity,
          paidPrice: item.paidPrice,
          productId: item.productId,
          extraId: item.extraId,
          status: item.status,
        },
      ]),
    });
  });
  it('should respond with status 400 when order is invalid', async () => {
    const order = {
      clientName: 'clientName',
      paymentMethod: 'CREDIT',
    };

    const response = await sever.post('/orders').send(order);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "itensId" is required ',
    });
  });
  it('should respond with status 404 when item not found', async () => {
    const order = {
      clientName: 'clientName',
      paymentMethod: 'CREDIT',
      itensId: [1],
    };

    const response = await sever.post('/orders').send(order);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Item not found or not available',
    });
  });
  it('should respond with status 404 when item not found', async () => {
    const { item } = await createItem(true);
    const order = {
      clientName: 'clientName',
      paymentMethod: 'CREDIT',
      itensId: [item.id, 1],
    };

    const response = await sever.post('/orders').send(order);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Item not found or not available',
    });
  });
});
