import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterProductUseCase } from "./factory/make-register-usecase";

export async function registerProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createProductBodySchema = z.object({
    name: z.string().min(3).max(30),
    price: z.string().min(3),
    description: z.string().min(10),
  });

  const { name, price, description } = createProductBodySchema.parse(
    request.body
  );

  try {
    const registerProductUsecase = makeRegisterProductUseCase();

    const user = await registerProductUsecase.execute({
      name,
      price,
      description,
    });

    return reply.status(201).send(user);
  } catch (err) {
    throw err;
  }
}
