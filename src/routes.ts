import { FastifyInstance } from "fastify";
import { register } from "./http/create-user-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
