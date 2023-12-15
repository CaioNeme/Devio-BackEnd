import { Request, Response } from 'express';
import { servicesExtra } from '@/services/extra.service';

export async function getAllExtras(_req: Request, res: Response) {
  const extras = await servicesExtra.getAllExtras();

  res.status(200).send(extras);
}
