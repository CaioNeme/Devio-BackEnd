import { Router } from 'express';
import {
  cancelItem,
  concludeItem,
  createItem,
  getAllItems,
  getItemById,
} from '@/controllers/item.controller';
import { validateBody } from '@/middlewares/validationSchema';
import { createItemSchema } from '@/schemas/item.schema';

const itemRouter = Router();

itemRouter.post('/item', validateBody(createItemSchema), createItem);
itemRouter.get('/item', getAllItems);
itemRouter.get('/item/:id', getItemById);
itemRouter.put('/item/cancel/:id', cancelItem);
itemRouter.put('/item/conclude/:id', concludeItem);

export default itemRouter;
