import { servicesProduct } from '@/services/product.service';
import { Request, Response } from 'express';

export async function getAllProducts(req: Request, res: Response) {
  const products = await servicesProduct.getAllProducts();
  res.status(200).send(products);
}

export async function getProductByName(req: Request, res: Response) {
  const { productName } = req.params;
  const product = await servicesProduct.getProductByName(productName);

  res.status(200).send(product);
}
