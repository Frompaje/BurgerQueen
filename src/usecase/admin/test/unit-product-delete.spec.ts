import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductRepository } from "../../../interface/product-repository";
import { makeProductMock } from "../factory/make-product";
import { ProductDeleteUseCase } from "../product-delete-usecase";
import { ProductDoesntExist } from "../../../err/product/product-doesnt-exist";
import { productRepositoryDependencies } from "../factory/make-product-dependencies";

describe("Product delete user", () => {
  let productRepository: ProductRepository;
  let sut: ProductDeleteUseCase;

  beforeEach(() => {
    const depedencies = productRepositoryDependencies();
    productRepository = depedencies.productRepository;

    sut = new ProductDeleteUseCase(productRepository);
  });

  describe("Sucess", () => {
    it("Should be delete product", async () => {
      const productMock = makeProductMock();

      vi.spyOn(productRepository, "findById").mockResolvedValue(productMock);

      vi.spyOn(productRepository, "delete").mockResolvedValue(productMock);

      const product = await sut.execute(productMock);

      expect(productRepository.delete).toBeCalledTimes(1);
      expect(product).toEqual(productMock);
    });
  });

  describe("Error", async () => {
    it("Shouldn't create the product, because the id wasn't found", async () => {
      const productMock = makeProductMock();

      vi.spyOn(productRepository, "findById").mockResolvedValue(null);
      const product = sut.execute(productMock);

      expect(productRepository.findById).toBeCalledTimes(1);
      expect(product).rejects.toBeInstanceOf(ProductDoesntExist);
    });
  });
});
