import Joi from 'joi';

export const createItemSchema = Joi.object({
  note: Joi.string().optional(),
  quantity: Joi.number().greater(0).required(),
  paidPrice: Joi.number().required(),
  productId: Joi.number().required(),
  extraId: Joi.number().optional(),
});
