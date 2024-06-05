import { FastifyInstance } from "fastify";
import { userRegister } from "./http/create-user-controller";
import { userDelete } from "./http/delete-user-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
  app.delete("/user", userDelete);
}
