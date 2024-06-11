import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { PriceRepository } from "../interface/product-repository";

export class PrismaPriceRepository implements PriceRepository {
  create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  }
  delete(id: string) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
  update(id: string, name?: string, description?: string, price?: string) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        description,
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
}
