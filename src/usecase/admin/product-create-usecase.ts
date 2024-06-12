import { ProductAlreadyExistsError } from "../../err/product/product-already-exists";
import { ProductRepository } from "../../interface/product-repository";

export interface UseCaseRequest {
  name: string;
  description: string;
  price: number;
}

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ name, description, price }: UseCaseRequest) {
    const isNameExist = await this.productRepository.findByName(name);

    if (isNameExist) {
      throw new ProductAlreadyExistsError();
    }

    // FIXME: BOTAR O VALOR CONVERTIDO NO GET
    // const convertedPrice = price / 100;

    const product = await this.productRepository.create(
      name,
      description,
      price
    );

    return product;
  }
}
