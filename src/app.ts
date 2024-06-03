import fastify, { FastifyInstance } from "fastify";
import { errorHandling } from "./err/fastify-handling-error";
import { appRoutes } from "./routes";

export const app: FastifyInstance = fastify();

app.register(appRoutes);

app.setErrorHandler(errorHandling);
