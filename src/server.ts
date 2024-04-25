import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.router";
import { imageRoutes } from "./routes/image.router";

const SERVER_PORT = 3100;
const app: FastifyInstance = fastify({ logger: true });

app.register(userRoutes, {
  prefix: "/users",
});

app.register(imageRoutes, {
  prefix: "/images",
});

app.listen({ port: SERVER_PORT }, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);
