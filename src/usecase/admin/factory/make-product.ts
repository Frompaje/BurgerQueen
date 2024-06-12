import { faker } from "@faker-js/faker";
import { Product } from "@prisma/client";
import { randomUUID } from "node:crypto";

export function makeProductMock(override?: Partial<Product>) {
  const product = {
    id: override?.id ?? randomUUID(),
    name: faker.commerce.productName(),
    createdAt: new Date(),
    description: override?.description ?? faker.commerce.productDescription(),
    price: override?.price ?? Number(faker.commerce.price()),
  };

  return product;
}
