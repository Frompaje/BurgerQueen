import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductRepository } from "../../../interface/product-repository";
import { makeProductMock } from "../factory/make-product";
import { repositoryDependencies } from "../factory/make-product-dependencies";
import { ProductDeleteUseCase } from "../product-delete-usecase";
import { ProductDoesntExist } from "../../../err/product/product-doesnt-exist";

describe("Product delete user", () => {
  let productRepository: ProductRepository;
  let sut: ProductDeleteUseCase;

  beforeEach(() => {
    const depedencies = repositoryDependencies();
    productRepository = depedencies.productRepository;

    sut = new ProductDeleteUseCase(productRepository);
  });

  it("Shoulde be delete product", async () => {
    const productMock = makeProductMock();

    vi.spyOn(productRepository, "findById").mockResolvedValue(productMock);
    vi.spyOn(productRepository, "delete").mockResolvedValue(productMock);
    const product = await sut.execute(productMock);

    expect(productRepository.delete).toBeCalledTimes(1);
    expect(product).toEqual(productMock);
  });

  describe("Erro delete", async () => {
    it("Shouldn't create the product, because the id wasn't found", async () => {
      const productMock = makeProductMock();

      vi.spyOn(productRepository, "findById").mockResolvedValue(null);
      const product = sut.execute(productMock);

      expect(productRepository.findById).toBeCalledTimes(1);
      expect(product).rejects.toBeInstanceOf(ProductDoesntExist);
    });
  });
});
