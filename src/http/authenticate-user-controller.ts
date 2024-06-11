import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateUseCase } from "./factory/make-authenticate-usecase";

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { id, email, password } = registerBodySchema.parse(request.body);

  try {
    const authenticate = makeAuthenticateUseCase();

    const user = await authenticate.execute({
      id,
      email,
      password,
    });

    const tokenJWT = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({ tokenJWT });
  } catch (err) {
    throw err;
  }
}
