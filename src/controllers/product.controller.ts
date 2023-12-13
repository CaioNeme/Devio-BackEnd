import { Request, Response } from 'express';
import { servicesProduct } from '@/services/product.service';

export async function getAllProducts(req: Request, res: Response) {
  const products = await servicesProduct.getAllProducts();
  res.status(200).send(products);
}
