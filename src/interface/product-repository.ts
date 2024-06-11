import { Product } from "@prisma/client";

export interface ProductRepository {
  create(name: string, price: string, description: string): Promise<Product>;
  delete(id: string): Promise<Product | null>;
  update(
    id: string,
    name?: string,
    description?: string,
    price?: string
  ): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
}
