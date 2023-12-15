import supertest from 'supertest';
import { dbClean } from '../helpers';
import app, { init, close } from '../../src/app';
import { createExtra } from '../factories/extras.factory';

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
    expect(response.body).toEqual([extra]);
  });
});
