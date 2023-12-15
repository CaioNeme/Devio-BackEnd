import express, { Express, json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { handleApplicationErrors } from '@/middlewares/';
import router from '@/routes/index.router';
import { loadEnv, connectDb, disconnectDb } from '@/config';

loadEnv();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
