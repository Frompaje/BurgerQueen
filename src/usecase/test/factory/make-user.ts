import { $Enums, User } from "@prisma/client"
import { randomUUID } from "crypto"
import { faker } from "@faker-js/faker"


export function makeUserMock(override?: Partial<User>) {

  const user = {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.string.alpha(),
    address: faker.address.city(),
    createdAt: new Date(),
    role: $Enums.Role.USER,
    ...override
  }


  return user
}