import { ApplicationError, RequestError } from '@/protocols';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/* eslint-disable */
export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  /* eslint-enable */

  if (err.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'BadRequest') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidDataError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
