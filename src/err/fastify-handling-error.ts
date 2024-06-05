import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { UserAlreadyExistsError } from "./user-already-exists.error";
import internal from "stream";
import { UserDoesntExist } from "./user-doesnt-exist";

export function errorHandling(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(400).send({
      message: error.message,
    });
  }

  if (error instanceof UserDoesntExist) {
    return reply.status(400).send({
      message: error.message
    })
  }


  return reply.status(500).send({ message: "internal server error" });
}
