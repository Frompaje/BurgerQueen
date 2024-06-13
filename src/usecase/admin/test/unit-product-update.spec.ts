import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductRepository } from "../../../interface/product-repository";
import { repositoryDependencies } from "../factory/make-product-dependencies";
import { ProductUpdateUseCase } from "../product-update-usecase";
import { makeProductMock } from "../factory/make-product";
import { ProductDoesntExist } from "../../../err/product/product-doesnt-exist";

describe("Product user", () => {
  let productRepository: ProductRepository;
  let sut: ProductUpdateUseCase;

  beforeEach(() => {
    const depedencies = repositoryDependencies();
    productRepository = depedencies.productRepository;

    sut = new ProductUpdateUseCase(productRepository);
  });

  it("Shoulde be update product", async () => {
    const productMock = {
      id: "id-Product",
      name: "XQuase Tudo",
      createdAt: new Date(),
      description: "É um x que vem quase tudo ",
      price: 3200,
    };

    const productUpdate = {
      id: "id-Product",
      name: "XBanana",
      createdAt: new Date(),
      description: "Xsalada com banana dentro",
      price: 3200,
    };

    vi.spyOn(productRepository, "findById").mockResolvedValue(productMock);
    vi.spyOn(productRepository, "update").mockResolvedValue(productUpdate);

    const product = await sut.execute(productMock);

    expect(productRepository.update).toBeCalledTimes(1);
    expect(product!.id).toEqual(productMock.id);
  });

  describe("Update Err", () => {
    it("Shouldn't update the product because it doesn't exist", async () => {
      const productMock = makeProductMock();

      vi.spyOn(productRepository, "findById").mockResolvedValue(null);

      const product = sut.execute(productMock);

      expect(productRepository.findById).toBeCalledTimes(1);
      expect(product).rejects.toBeInstanceOf(ProductDoesntExist);
    });
  });
});
