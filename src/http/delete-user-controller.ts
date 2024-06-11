import z from "zod";
import { makeDeleteUseCase } from "./factory/make-delete-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    id: z.string(),
  });

  const { id } = registerBodySchema.parse(request.body);

  try {
    const register = makeDeleteUseCase();

    const user = await register.execute({
      id,
    });

    return reply.status(200).send({ user });
  } catch (err) {
    throw err;
  }
}
