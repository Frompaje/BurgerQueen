import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";

export async function authenticateAdminJWT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();

    const user = await prisma.user.findFirst({
      where: {
        id: request.user.sub,
      },
    });

    if (user?.role === "USER") {
      return reply.status(401).send({
        message: "Unauthorized. Because you don't have permission.",
      });
    }

    return user;
  } catch (err) {
    return reply.status(401).send({
      message: "Unauthorized.",
    });
  }
}
