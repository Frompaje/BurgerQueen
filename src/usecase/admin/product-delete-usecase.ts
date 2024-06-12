import { ProductAlreadyExistsError } from "../../err/product/product-already-exists";
import { ProductDoesntExist } from "../../err/product/product-doesnt-exist";
import { ProductRepository } from "../../interface/product-repository";

export interface UseCaseRequest {
  id: string;
}

export class ProductDeleteUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id }: UseCaseRequest) {
    const isUserExist = await this.productRepository.findById(id);

    if (!isUserExist) {
      throw new ProductDoesntExist();
    }

    const product = await this.productRepository.delete(id);

    return product;
  }
}
