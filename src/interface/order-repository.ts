import { Order } from "@prisma/client";

export interface OrderRepository {
  create(productId: string, userId: string): Promise<Order>;
  delete(orderId: string): Promise<Order>;
  findOrder(productId: string, userId: string): Promise<Order | null>;
}
