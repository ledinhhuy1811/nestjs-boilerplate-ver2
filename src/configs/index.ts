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

  // bcrypt
  BCRYPT_ROUNDS: Joi.number().default(10),
});

const { value: config } = configSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

export default () => ({
  // environment
  env: config.NODE_ENV,
  port: config.PORT,

  // rpc
  rpc: {
    orai: config.ORAI_RPC_URL,
  },

  // database
  database: {
    url: config.MONGODB_URL,
  },

  // bcrypt
  bcryptRounds: config.BCRYPT_ROUNDS,
});
