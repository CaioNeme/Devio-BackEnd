import { servicesItem } from '@/services/item.service';
import { Request, Response } from 'express';

export async function createItem(req: Request, res: Response) {
  const item = req.body;
  const resp = await servicesItem.createItem(item);
  res.status(201).send({ id: resp.id });
}

export async function getAllItems(_req: Request, res: Response) {
  const items = await servicesItem.getAllItems();
  res.status(200).send(items);
}

export async function getItemById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const item = await servicesItem.getItemById(id);
  res.status(200).send(item);
}

export async function cancelItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  await servicesItem.cancelItem(id);
  res.sendStatus(200);
}

export async function concludeItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  await servicesItem.concludeItem(id);
  res.sendStatus(200);
}
