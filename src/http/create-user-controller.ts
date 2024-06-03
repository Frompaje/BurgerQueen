import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUserRepository } from "../repository/prisma-user-repository";
import { registerUseCase } from "../usecase/user-create-usecase";
import { BcryptAdapter } from "../interface/password-hash";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
    const userPrismaRepository = new PrismaUserRepository();
    const bcryptAdapter = new BcryptAdapter();
    const registerUsecase = new registerUseCase(
      userPrismaRepository,
      bcryptAdapter
    );

    const user = await registerUsecase.execute({
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
