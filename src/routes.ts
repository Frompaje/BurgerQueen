import { FastifyInstance } from "fastify";
import { registerUserController } from "./http/create-user-controller";
import { deleteUserController } from "./http/delete-user-controller";
import { updateUserController } from "./http/update-use-controller";
import { authenticateUserController } from "./http/authenticate-user-controller";
import { verifyJWT } from "./middlewares/login-jwt";
import { updateEmailUserController } from "./http/update-use-email-controller";
import { updatePasswordUserController } from "./http/update-use-password.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", registerUserController);
  app.delete("/user", deleteUserController);
  app.patch("/user", updateUserController);
  app.post("/login", authenticateUserController);
  // Authenticate

  app.patch("/user/update", { onRequest: [verifyJWT] }, updateUserController);
  app.patch(
    "/user/email",
    { onRequest: [verifyJWT] },
    updateEmailUserController
  );
  app.patch(
    "/user/password",
    { onRequest: [verifyJWT] },
    updatePasswordUserController
  );
}
