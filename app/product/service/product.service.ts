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

  async get(id: string): Promise<Product | null> {
    try {
      const foundProduct = await this.persistance.get(id);
      if (!foundProduct) {
        return null;
      }
      return foundProduct;
    } catch (error) {
      throw error;
    }
  }

  async create(name: string, price: number): Promise<Product> {
    try {
      const product = new Product(name, price);
      return await this.persistance.save(product);
    } catch (error) {
      throw error;
    }
  }

  async enable(product: Product): Promise<Product> {
    try {
      product.enable();
      return await this.persistance.save(product);
    } catch (error) {
      throw error;
    }
  }

  async disable(product: Product): Promise<Product> {
    try {
      product.disable();
      return await this.persistance.save(product);
    } catch (error) {
      throw error;
    }
  }
}
