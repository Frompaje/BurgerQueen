import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductRepository } from "../../../interface/product-repository";
import { repositoryDependencies } from "../factory/make-product-dependencies";
import { ProductUseCase } from "../product-create-usecase";
import { makeProductMock } from "../factory/make-product";
import { ProductAlreadyExistsError } from "../../../err/product/product-already-exists";

describe("Create user", () => {
  let productRepository: ProductRepository;
  let sut: ProductUseCase;

  beforeEach(() => {
    const depedencies = repositoryDependencies();
    productRepository = depedencies.productRepository;

    sut = new ProductUseCase(productRepository);
  });

  it("Shoulde be create user", async () => {
    const productMock = makeProductMock();

    vi.spyOn(productRepository, "create").mockResolvedValue(productMock);
    const product = await sut.execute(productMock);
    expect(productRepository.create).toBeCalledTimes(1);
    expect(product.id).toEqual(productMock.id);
  });

  describe("Create err", () => {
    it("Should not create the product, because the product was not found", async () => {
      const productMock = makeProductMock();

      vi.spyOn(productRepository, "findByName").mockResolvedValue(productMock);

      const product = sut.execute(productMock);

      expect(productRepository.findByName).toBeCalledTimes(1);
      expect(productRepository.create).toBeCalledTimes(0);
      expect(product).rejects.toBeInstanceOf(ProductAlreadyExistsError);
    });
  });
});
