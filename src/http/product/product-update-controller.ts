import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateProductUseCase } from "./factory/make-update-usecase";

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateProductBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
  });

  const { id, name, description, price } = updateProductBodySchema.parse(
    request.body
  );

  try {
    const updateProductUsecase = makeUpdateProductUseCase();

    const user = await updateProductUsecase.execute({
      id,
      name,
      description,
      price,
    });

    return reply.status(202).send(user);
  } catch (err) {
    throw err;
  }
}
