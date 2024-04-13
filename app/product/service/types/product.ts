import Product from "../../entities/product";
import {
  ProductInterface,
  ProductPersistenceInterface,
} from "../../entities/types/product";

export interface ProductServiceInterface {
  readonly persistance: ProductPersistenceInterface;
  get(id: string): ProductInterface;
  create(name: string, price: number): void;
  enable(product: ProductInterface): ProductInterface;
  disable(product: ProductInterface): ProductInterface;
}
