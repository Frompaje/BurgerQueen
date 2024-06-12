import { PrismaPriceRepository } from "../../../repository/prisma-product-repository";
import { ProductDeleteUseCase } from "../../../usecase/admin/product-delete-usecase";

export function makeDeleteProductUseCase() {
  const productPrismaRepository = new PrismaPriceRepository();
  const registerUsecase = new ProductDeleteUseCase(productPrismaRepository);

  return registerUsecase;
}
