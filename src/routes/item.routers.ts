import { cancelItem, concludeItem, createItem, getAllItems, getItemById } from '@/controllers/item.controller';
import { Router } from 'express';

const itemRouter = Router();

itemRouter.post('/item', createItem);
itemRouter.get('/item', getAllItems);
itemRouter.get('/item/:id', getItemById);
itemRouter.put('/item/cancel/:id', cancelItem);
itemRouter.put('/item/conclude/:id', concludeItem);

export default itemRouter;
