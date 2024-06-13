import { FastifyInstance } from "fastify";
import { verifyJWT } from "./middlewares/login-jwt";
import { registerUserController } from "./http/user/create-user-controller";
import { deleteUserController } from "./http/user/delete-user-controller";
import { updateUserController } from "./http/user/update-use-controller";
import { authenticateUserController } from "./http/user/authenticate-user-controller";
import { updateEmailUserController } from "./http/user/update-use-email-controller";
import { updatePasswordUserController } from "./http/user/update-use-password.controller";
import { registerProductController } from "./http/product/product-create-controller";
import { deleteProductController } from "./http/product/product-delete-controller";
import { authenticateAdminJWT } from "./middlewares/admin-jwt";
import { updateProductController } from "./http/product/product-update-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", registerUserController);
  app.post("/login", authenticateUserController);

  // Authenticate
  app.delete("/user", { onRequest: [verifyJWT] }, deleteUserController);

  app.patch("/user", { onRequest: [verifyJWT] }, updateUserController);

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

  // Product
  app.post(
    "/product",
    { onRequest: [authenticateAdminJWT] },
    registerProductController
  );

  app.delete(
    "/product",
    { onRequest: [authenticateAdminJWT] },
    deleteProductController
  );

  app.patch(
    "/product",
    { onRequest: [authenticateAdminJWT] },
    updateProductController
  );
}
