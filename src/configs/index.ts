import Joi from 'joi';

export const configSchema = Joi.object({
  // environment
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
});

export default () => ({
  // environment
  env: process.env.NODE_ENV,
  port: process.env.PORT,
});
