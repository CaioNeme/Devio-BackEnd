import {
  getAllProducts,
  getProductByName,
} from '@/controllers/product.controller';
import { Router } from 'express';

const productRouter = Router();

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:productName', getProductByName);

export default productRouter;
