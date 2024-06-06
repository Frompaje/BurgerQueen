import { faker } from "@faker-js/faker";
import { $Enums, User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { randomUUID } from "crypto";

export function makeUserMock(override?: Partial<User>) {
  const user = {
    id: override?.id ?? randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.location.city(),
    password: hashSync(override?.password ?? faker.internet.password(), 6),
    createdAt: new Date(),
    role: $Enums.Role.USER,
    ...override,
  };

  return user;
}

export function makeUserMockPasswordNoHashed(override?: Partial<User>) {
  const user = {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.location.city(),
    createdAt: new Date(),
    role: $Enums.Role.USER,
    ...override,
  };

  return user;
}
