import Joi from 'joi';

export const createOrderSchema = Joi.object({
  clientName: Joi.string().required(),
  paymentMethod: Joi.string().required().valid('CREDIT', 'DEBIT', 'CASH'),
  itensId: Joi.array().items(Joi.number().greater(0)).required(),
});
