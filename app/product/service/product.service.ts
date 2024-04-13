import Product from "../entities/product";
import {
  ProductInterface,
  ProductPersistenceInterface,
} from "../entities/types/product";
import { ProductServiceInterface } from "./types/product";

export default class ProductService implements ProductServiceInterface {
  persistance: ProductPersistenceInterface;

  constructor(persistence: ProductPersistenceInterface) {
    this.persistance = persistence;
  }

  get(id: string): ProductInterface {
    try {
      return this.persistance.get(id);
    } catch (error) {
      throw error;
    }
  }

  create(name: string, price: number): ProductInterface {
    try {
      const product = new Product(name, price);
      return this.persistance.save(product);
    } catch (error) {
      throw error;
    }
  }

  enable(product: ProductInterface): ProductInterface {
    try {
      product.enable();
      return this.persistance.save(product);
    } catch (error) {
      throw error;
    }
  }

  disable(product: ProductInterface): ProductInterface {
    try {
      product.disable();
      return this.persistance.save(product);
    } catch (error) {
      throw error;
    }
  }
}
