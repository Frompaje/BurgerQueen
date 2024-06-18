import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdatePasswordUseCase } from "./factory/make-update-password-usecase";

export async function updatePasswordUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updatePasswordBodySchema = z.object({
    id: z.string(),
    password: z.string().min(6),
  });

  const { id, password } = updatePasswordBodySchema.parse(request.body);

  try {
    const passwordUpdateUsecase = makeUpdatePasswordUseCase();

    const user = await passwordUpdateUsecase.execute({
      id,
      password,
    });

    return reply.status(202).send({ user });
  } catch (err) {
    throw err;
  }
}
