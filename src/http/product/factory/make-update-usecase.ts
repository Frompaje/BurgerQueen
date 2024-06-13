import { PrismaPriceRepository } from "../../../repository/prisma-product-repository";
import { ProductUpdateUseCase } from "../../../usecase/admin/product-update-usecase";

export function makeUpdateProductUseCase() {
  const productPrismaRepository = new PrismaPriceRepository();
  const updateUsecase = new ProductUpdateUseCase(productPrismaRepository);

  return updateUsecase;
}
