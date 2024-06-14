import { vi } from "vitest";
import { OrderRepository } from "../../../interface/order-repository";

export function orderRepositoryDependencies() {
  const orderRepository: OrderRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    findOrder: vi.fn(),
  };

  return {
    orderRepository,
  };
}
