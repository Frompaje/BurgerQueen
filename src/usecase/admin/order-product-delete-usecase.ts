import { OrderDoesntExist } from "../../err/product/order-doesnt-exist";
import { OrderRepository } from "../../interface/order-repository";

export class OrderDeleteProductUsecase {
  constructor(private readonly orderRepositoy: OrderRepository) {}
  async execute(productId: string, userId: string) {
    const productAndUserOrder = await this.orderRepositoy.findOrder(
      productId,
      userId
    );

    if (!productAndUserOrder) {
      throw new OrderDoesntExist();
    }

    const createOrder = await this.orderRepositoy.delete(
      productAndUserOrder.id
    );

    return createOrder;
  }
}
