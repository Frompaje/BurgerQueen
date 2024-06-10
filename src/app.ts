import fastify, { FastifyInstance } from "fastify";
import { errorHandling } from "./err/fastify-handling-error";
import { appRoutes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app: FastifyInstance = fastify();

app.register(appRoutes);

app.setErrorHandler(errorHandling);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
