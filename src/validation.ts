import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

function errorResponse(schemaErrors: Joi.ValidationError) {
  const errors = schemaErrors.details.map((error) => {
    const { path, message } = error;
    return { path, message };
  });

  return {
    status: 'failed',
    errors,
  };
}

function validateSchema(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      res.status(400).json(errorResponse(error));
      return;
    }

    next();
  };
}

export default validateSchema;
