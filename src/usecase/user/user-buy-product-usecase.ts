import { ProductDoesntExist } from "../../err/product/product-doesnt-exist";
import { UserDoesntExist } from "../../err/user/user-doesnt-exist";
import { ProductRepository } from "../../interface/product-repository";
import { UserRepository } from "../../interface/user-repository";

interface BuyProductUseCaseRequest {
  id: string;
  idProduct: string;
}

export class BuyProductUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository
  ) {}
  async execute({ id, idProduct }: BuyProductUseCaseRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserDoesntExist();
    }

    const product = await this.productRepository.findById(idProduct);

    if (!product) {
      throw new ProductDoesntExist();
    }

    const productCart = [];
    productCart.push(product);

    return user;
  }
}
