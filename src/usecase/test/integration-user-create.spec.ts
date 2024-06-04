import { describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "../../err/user-already-exists.error";
import { makeUserCreated } from "./factory/InMemory-make-create-user";
import { makeUserMock } from "./factory/make-user";

describe("Create user", () => {
  it("Shoulde be create user", async () => {
    const userMock = makeUserMock()
    const sut = makeUserCreated();

    const { user } = await sut.execute(userMock);

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Jonathan D.");
  });

  it("Shoulde be hashing password", async () => {
    const userMock = makeUserMock()
    const sut = makeUserCreated();


    const { user } = await sut.execute(userMock);
    const isPasswordCorrectHashed = await compare("123123", user.password);

    expect(isPasswordCorrectHashed).toBe(true);
  });

  describe("Erro created users", () => {
    it("Should not create users with same email", async () => {
      const user = makeUserMock()
      const sut = makeUserCreated();


      await sut.execute(user);

      await expect(() => {
        return sut.execute(user);
      }).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
  });
});
