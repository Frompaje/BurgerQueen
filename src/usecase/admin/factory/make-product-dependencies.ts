import { vi } from "vitest";
import { ProductRepository } from "../../../interface/product-repository";

export function repositoryDependencies() {
  const productRepository: ProductRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    findByName: vi.fn(),
    findByIdAndName: vi.fn(),
  };

  return {
    productRepository,
  };
}
