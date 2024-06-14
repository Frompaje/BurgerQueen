import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductAlreadyExistsError } from "../../../err/product/product-already-exists";
import { OrderRepository } from "../../../interface/order-repository";
import { orderRepositoryDependencies } from "../factory/make-order-dependencies";
import { makeProductMock } from "../factory/make-product";
import { OrderCreateProductUsecase } from "../order-product-create-usecase";
import { ProductRepository } from "../../../interface/product-repository";
import { UserRepository } from "../../../interface/user-repository";

describe("Create order", () => {
  let orderRepository: OrderRepository;
  let productRepository: ProductRepository;
  let userRepository: UserRepository;

  let sut: OrderCreateProductUsecase;

  beforeEach(() => {
    const depedencies = orderRepositoryDependencies();

    orderRepository = depedencies.orderRepository;

    sut = new OrderCreateProductUsecase(
      orderRepository,
      productRepository,
      userRepository
    );
  });

  it("Shoulde be create order", async () => {
    const productMock = makeProductMock();

    vi.spyOn(productRepository, "create").mockResolvedValue(productMock);
  });
});
