import { PrismaProductRepository } from "../../../repository/prisma-product-repository";
import { ProductUpdateUseCase } from "../../../usecase/admin/product-update-usecase";

export function makeUpdateProductUseCase() {
  const productPrismaRepository = new PrismaProductRepository();
  const updateUsecase = new ProductUpdateUseCase(productPrismaRepository);

  return updateUsecase;
}
