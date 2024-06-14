import { prisma } from "../database/prisma";
import { OrderRepository } from "../interface/order-repository";

export class PrismaOrderProductRepository implements OrderRepository {
  create(productId: string, userId: string) {
    return prisma.order.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findOrder(productId: string, userId: string) {
    return prisma.order.findFirst({
      where: {
        productId,
        userId,
      },
    });
  }

  delete(orderId: string) {
    return prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }
}
