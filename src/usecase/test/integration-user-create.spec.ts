import { describe, expect, it } from "vitest";
import { makeUserCreated } from "./factory/make-create-user";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "../../err/user-already-exists.error";

describe("Create user", () => {
  it("Shoulde be create user", async () => {
    const sut = makeUserCreated();

    const { user } = await sut.execute({
      name: "Jonathan D.",
      email: "email@exemple.com",
      address: "Rua União Flasco",
      password: "123123",
      role: "USER",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Jonathan D.");
  });

  it("Shoulde be hashing password", async () => {
    const sut = makeUserCreated();

    const { user } = await sut.execute({
      name: "Jonathan D.",
      email: "email@exemple.com",
      address: "Rua União Flasco",
      password: "123123",
      role: "USER",
    });

    const isPasswordCorrectHashed = await compare("123123", user.password);

    expect(isPasswordCorrectHashed).toBe(true);
  });

  describe("Erro created users", () => {
    it("Should not create users", async () => {
      const sut = makeUserCreated();

      await sut.execute({
        name: "Jonathan D.",
        email: "email@exemple.com",
        address: "Rua União Flasco",
        password: "123123",
        role: "USER",
      });

      await expect(() => {
        return sut.execute({
          name: "Jonathan D.",
          email: "email@exemple.com",
          address: "Rua União Flasco",
          password: "123123",
          role: "USER",
        });
      }).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
  });
});
