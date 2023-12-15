import { servicesExtra } from '@/services/extra.service';
import { Request, Response } from 'express';

export async function getAllExtras(_req: Request, res: Response) {
  const extras = await servicesExtra.getAllExtras();

  res.status(200).send(extras);
}
