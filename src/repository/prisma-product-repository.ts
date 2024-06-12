import { prisma } from "../database/prisma";
import { ProductRepository } from "../interface/product-repository";

export class PrismaPriceRepository implements ProductRepository {
  create(name: string, description: string, price: number) {
    return prisma.product.create({
      data: { name: name, description: description, price: price },
    });
  }

  delete(id: string) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
  update(id: string, name?: string, description?: string, price?: number) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
      },
    });
  }

  findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }
  findByName(name: string) {
    return prisma.product.findFirst({
      where: {
        name,
      },
    });
  }
}
