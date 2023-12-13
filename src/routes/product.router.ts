import { getAllProducts } from '@/controllers/product.controller';
import { Router } from 'express';

const productRouter = Router();

productRouter.get('/products', getAllProducts);

export default productRouter;
