import { FastifyInstance } from "fastify";
import { verifyJWT } from "./middlewares/login-jwt";
import { registerUserController } from "./http/user/create-user-controller";
import { deleteUserController } from "./http/user/delete-user-controller";
import { updateUserController } from "./http/user/update-use-controller";
import { authenticateUserController } from "./http/user/authenticate-user-controller";
import { updateEmailUserController } from "./http/user/update-use-email-controller";
import { updatePasswordUserController } from "./http/user/update-use-password.controller";

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
