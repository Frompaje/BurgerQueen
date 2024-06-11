import { ProductRepository } from "../../interface/product-repository";

export interface UseCaseRequest {
  id: string;
  description: string;
  price: string;
}

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id }: UseCaseRequest) {
    const productExist = await this.productRepository.findById(id);

    if (!productExist) {
    }
  }
}
