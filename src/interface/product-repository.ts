import { Prisma, Product } from "@prisma/client";

export interface PriceRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  delete(id: string): Promise<Product | null>;
  update(
    id: string,
    name?: string,
    description?: string,
    price?: string
  ): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
}
