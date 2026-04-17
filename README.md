# NestJS Boilerplate v2

A backend boilerplate built with NestJS, TypeScript, MongoDB (Mongoose), JWT authentication, API key guard, Swagger docs, and Cosmos/Oraichain balance integration.

This repository is intended as a **learning/example starter**. It provides a clean foundation and common patterns, but you should harden and extend it before using it as a real production product.

## Features

- NestJS v11 with modular architecture (`Auth`, `User`, `Health`, `Cosmos`)
- MongoDB integration via Mongoose
- JWT auth (access token + refresh token)
- API key protection for sensitive admin auth routes
- Role-based authorization guard (`admin`, `user`)
- Request validation with `class-validator` + global `ValidationPipe`
- Standardized API response wrapper via interceptor
- Swagger/OpenAPI documentation
- Security middlewares: `helmet`, `compression`, `cookie-parser`, CORS
- Docker Compose setup for local MongoDB
- Oraichain balance lookup with CosmJS

## Tech Stack

### Core

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/) (recommend Node.js 20+)

### Data & Auth

- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [@nestjs/jwt](https://docs.nestjs.com/security/authentication) for token signing/verification
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing

### API & Validation

- [Swagger/OpenAPI](https://docs.nestjs.com/openapi/introduction) via `@nestjs/swagger`
- `class-validator` + `class-transformer`
- `Joi` for environment variable validation

### Infrastructure & Utilities

- [Docker Compose](https://docs.docker.com/compose/) (local database)
- [CosmJS](https://github.com/cosmos/cosmjs) for Oraichain RPC balance checks
- ESLint + Prettier + Jest

## Project Structure

```bash
nestjs-boilerplate-ver2/
├── src/
│   ├── app/
│   │   ├── auth/                  # Register/login endpoints and auth business logic
│   │   ├── health/                # Health check endpoint
│   │   └── user/                  # User profile, admin list users, Oraichain balance
│   ├── common/
│   │   ├── decorators/            # Custom decorators (roles, swagger helper)
│   │   ├── enums/                 # Shared enums (role)
│   │   ├── guards/                # API key, JWT, role guards
│   │   ├── interceptors/          # Standard response formatter
│   │   └── middlewares/           # Request logging middleware
│   ├── configs/                   # Joi schema + typed runtime config mapping
│   ├── schemas/                   # Mongoose schemas (user)
│   ├── services/
│   │   └── cosmos/                # CosmJS provider and DI token
│   ├── docker/
│   │   └── docker-compose.yml     # MongoDB local container
│   ├── app.module.ts              # Root module
│   └── main.ts                    # Bootstrap, middleware, versioning, swagger
├── test/                          # Jest e2e scaffold
├── .env.example                   # Environment variables template
├── package.json
└── README.md
```

## Prerequisites

- Node.js 20+
- npm or yarn
- Docker + Docker Compose (for local MongoDB)

## Environment Variables

Create a `.env` file in project root (you can copy from `.env.example`):

```bash
cp .env.example .env
```

Default variables:

```env
# environment
PORT=8000
NODE_ENV="development"

# rpc
ORAI_RPC_URL="https://oraichain-rpc.publicnode.com:443"

# database
MONGODB_URL="mongodb://admin:root@localhost:27017/"

# bcrypt
BCRYPT_ROUNDS=10

# api key
API_KEY="nestjs-boilerplate-ver2-api-key"

# jwt
JWT_SECRET="nestjs-boilerplate-ver2-jwt-secret"
JWT_ACCESS_TOKEN_EXPIRATION_TIME="5m"
JWT_REFRESH_TOKEN_EXPIRATION_TIME="1d"
```

## Installation

```bash
npm install
```

or

```bash
yarn install
```

## Start Project

### 1) Start MongoDB (Docker)

```bash
npm run db:start
```

To stop and remove volumes:

```bash
npm run db:stop
```

### 2) Run API

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

### 3) Open Swagger docs

When server is running:

- API docs: [http://localhost:8000/api](http://localhost:8000/api)

The app enables URI versioning (`v1`), so endpoints are prefixed with `/v1`.

## Main Endpoints

### Health

- `GET /v1/health`

### Auth

- `POST /v1/auth/register-user`
- `POST /v1/auth/register-admin` (requires header `api-key`)
- `POST /v1/auth/login-user`
- `POST /v1/auth/login-admin` (requires header `api-key`)

### User

- `GET /v1/user` (requires `Authorization: Bearer <token>`)
- `GET /v1/user/all?page=1&limit=10` (admin role + JWT required)
- `GET /v1/user/oraichain-balance/:address`

## Available Scripts

- `npm run db:start` - start MongoDB container
- `npm run db:stop` - stop MongoDB and remove volume
- `npm run start` - start Nest app
- `npm run start:dev` - start with watch mode
- `npm run start:debug` - start in debug + watch mode
- `npm run start:prod` - run compiled output
- `npm run build` - build TypeScript to `dist`
- `npm run lint` - run ESLint with auto-fix
- `npm run format` - run Prettier on `src` and `test`
- `npm run test` - run unit tests
- `npm run test:e2e` - run e2e tests
- `npm run test:cov` - run test coverage

## Response Format

The global response interceptor wraps successful responses in this shape:

```json
{
  "success": true,
  "data": {},
  "message": "Some message",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

## Security Notes

- Passwords are hashed using bcrypt
- JWT guard validates bearer token and injects payload to request
- API key guard protects admin auth routes
- Role guard restricts admin-only endpoints
- `helmet`, `compression`, and cookie parser are enabled globally

## Example-Only Disclaimer

This repository is a **boilerplate/example**, not a complete production system.

Before shipping to real users, you should at least:

- add refresh-token rotation/revocation strategy
- add structured logging/monitoring/alerting
- improve error model and exception filters
- harden security (rate limits, stricter CORS, secret management, audit logging)
- add full test coverage (unit, integration, e2e)
- add CI/CD and deployment strategy
- add migration/data lifecycle/backup strategy
- review performance and scalability requirements
