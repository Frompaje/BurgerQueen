import { Product } from "@prisma/client";

export interface ProductRepository {
  create(name: string, description: string, price: number): Promise<Product>;

  delete(id: string): Promise<Product | null>;

  update(
    id: string,
    name?: string,
    description?: string,
    price?: number
  ): Promise<Product | null>;

  findById(id: string): Promise<Product | null>;

  findByName(name: string): Promise<Product | null>;

  findByIdAndName(id: string, name: string): Promise<Product | null>;
}
