import { FastifyInstance } from "fastify";
import { registerUserController } from "./http/create-user-controller";
import { deleteUserController } from "./http/delete-user-controller";
import { updateUserController } from "./http/update-use-controller";
import { authenticateUserController } from "./http/authenticate-user-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", registerUserController);
  app.delete("/user", deleteUserController);
  app.patch("/user", updateUserController);
  app.post("/login", authenticateUserController);
  // Authenticate
}
