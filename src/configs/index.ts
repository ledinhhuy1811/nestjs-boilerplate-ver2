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

  // database
  MONGODB_URL: Joi.string()
    .uri()
    .default('mongodb://admin:root@localhost:27017/'),
});

export default () => ({
  // environment
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  // rpc
  rpc: {
    orai: process.env.ORAI_RPC_URL,
  },

  // database
  database: {
    url: process.env.MONGODB_URL,
  },
});
