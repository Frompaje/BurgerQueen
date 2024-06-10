import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateUseCase } from "./factory/make-update-usecase";

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(6).max(30).optional(),
    address: z.string().min(6).optional(),
  });

  const { id, email, name, address } = registerBodySchema.parse(request.body);

  try {
    const update = makeUpdateUseCase();

    const user = await update.execute({
      id,
      email,
      name,
      address,
    });

    return reply.send(202).send({ user });
  } catch (err) {
    throw err;
  }
}
