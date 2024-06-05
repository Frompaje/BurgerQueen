import { faker } from "@faker-js/faker"
import { $Enums, User } from "@prisma/client"
import { hashSync } from "bcryptjs"
import { randomUUID } from "crypto"


export function makeUserMock(override?: Partial<User>) {



  const user = {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashSync(override?.password ?? faker.string.alpha(), 6),
    address: faker.address.city(),
    createdAt: new Date(),
    role: $Enums.Role.USER,
    ...override
  }


  return user
}