import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateUseCase } from "./factory/make-authenticate-usecase";
import { env } from "../env";

export async function AuthenticateUserController(
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
    const register = makeAuthenticateUseCase();

    const user = await register.execute({
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

    return reply.send(200).send({ user, tokenJWT });
  } catch (err) {
    throw err;
  }
}
