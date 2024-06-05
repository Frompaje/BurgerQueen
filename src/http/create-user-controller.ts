import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterUseCase } from "./factory/make-register-usecase";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export async function userRegister(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(6).max(30),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string().min(6),
    role: z.nativeEnum(Role),
  });

  const { name, email, password, address, role } = registerBodySchema.parse(
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

    return reply.send(201).send(user);
  } catch (err) {
    throw err;
  }
}
