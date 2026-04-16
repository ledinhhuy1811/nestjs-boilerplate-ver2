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

  // api key
  API_KEY: Joi.string().required(),

  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().default('5m'),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().default('1d'),
});

export default () => ({
  // environment
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),

  // rpc
  rpc: {
    orai: process.env.ORAI_RPC_URL,
  },

  // database
  database: {
    url: process.env.MONGODB_URL,
  },

  // bcrypt
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS),

  // api key
  apiKey: process.env.API_KEY,

  // jwt
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    refreshTokenExpirationTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  },
});
