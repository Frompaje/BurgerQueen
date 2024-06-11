import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterUseCase } from "../factory/make-register-usecase";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    name: z.string().min(6).max(30),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string().min(6),
    role: z.nativeEnum(Role).default(Role.USER),
  });

  const { name, email, password, address, role } = createUserBodySchema.parse(
    request.body
  );
  try {
    const register = makeRegisterUseCase();

    const user = await register.execute({
      name,
      email,
      password,
      address,
      role,
    });

    return reply.status(201).send(user);
  } catch (err) {
    throw err;
  }
}
