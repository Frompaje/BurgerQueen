import { PrismaProductRepository } from "../../../repository/prisma-product-repository";
import { ProductDeleteUseCase } from "../../../usecase/admin/product-delete-usecase";

export function makeDeleteProductUseCase() {
  const productPrismaRepository = new PrismaProductRepository();
  const registerUsecase = new ProductDeleteUseCase(productPrismaRepository);

  return registerUsecase;
}
