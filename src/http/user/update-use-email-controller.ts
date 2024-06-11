import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateEmailUseCase } from "../factory/make-update-email-usecase";

export async function updateEmailUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateEmailBodySchema = z.object({
    id: z.string(),
    email: z.string().email(),
    emailUpdate: z.string().email(),
  });

  const { id, email, emailUpdate } = updateEmailBodySchema.parse(request.body);

  try {
    const emailUpdateUsecase = makeUpdateEmailUseCase();

    const user = await emailUpdateUsecase.execute({
      id,
      email,
      emailUpdate,
    });

    return reply.status(202).send({ user });
  } catch (err) {
    throw err;
  }
}
