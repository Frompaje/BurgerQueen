import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();

    const user = await prisma.user.findFirst({
      where: {
        id: request.user.sub,
      },
    });

    return user;
  } catch (err) {
    return reply.status(401).send({
      message: "Unauthorized.",
    });
  }
}
