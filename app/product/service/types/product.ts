import Product from "../../entities/product";
import {
  ProductInterface,
  ProductPersistenceInterface,
} from "../../entities/types/product";

export interface ProductServiceInterface {
  readonly persistance: ProductPersistenceInterface;
  get(id: string): Promise<Product | null>;
  create(name: string, price: number): Promise<Product>;
  enable(product: Product): Promise<Product>;
  disable(product: Product): Promise<Product>;
}
