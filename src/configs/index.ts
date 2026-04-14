import Joi from 'joi';

export const configSchema = Joi.object({
  // environment
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // rpc
  ORAI_RPC_URL: Joi.string()
    .uri()
    .default('https://oraichain-rpc.publicnode.com:443'),
});

export default () => ({
  // environment
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  // rpc
  rpc: {
    orai: process.env.ORAI_RPC_URL,
  },
});
