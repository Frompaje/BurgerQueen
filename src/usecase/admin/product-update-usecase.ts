import { ProductDoesntExist } from "../../err/product/product-doesnt-exist";
import { ProductRepository } from "../../interface/product-repository";

export interface UseCaseRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

export class ProductUpdateUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id, name, description, price }: UseCaseRequest) {
    const isProductExist = await this.productRepository.findById(id);

    if (!isProductExist) {
      throw new ProductDoesntExist();
    }

    const nameProduct = (isProductExist.name = name ?? isProductExist.name);

    const descriptionProduct = (isProductExist.description =
      description ?? isProductExist.description);

    const priceProduct = (isProductExist.price = price ?? isProductExist.price);

    const product = await this.productRepository.update(
      id,
      nameProduct,
      descriptionProduct,
      priceProduct
    );

    return product;
  }
}
