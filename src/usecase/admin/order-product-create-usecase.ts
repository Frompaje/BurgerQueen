import { InvalidCredentialsError } from "../../err/user/invalid-credentials-error";
import { OrderRepository } from "../../interface/order-repository";
import { ProductRepository } from "../../interface/product-repository";
import { UserRepository } from "../../interface/user-repository";

export class OrderCreateProductUsecase {
  constructor(
    private readonly orderRepositoy: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository
  ) {}
  async execute(productId: string, userId: string) {
    const user = await this.userRepository.findById(userId);
    const product = await this.productRepository.findById(productId);

    if (!user || !product) {
      throw new InvalidCredentialsError();
    }

    const createOrder = await this.orderRepositoy.create(productId, userId);
    return createOrder;
  }
}
