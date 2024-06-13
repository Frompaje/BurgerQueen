import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteProductUseCase } from "./factory/make-delete-usecase";

export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProductBodySchema = z.object({
    id: z.string(),
  });

  const { id } = deleteProductBodySchema.parse(request.body);

  try {
    const deleteProductUsecase = makeDeleteProductUseCase();

    const user = await deleteProductUsecase.execute({
      id,
    });

    return reply.status(202).send(user);
  } catch (err) {
    throw err;
  }
}
