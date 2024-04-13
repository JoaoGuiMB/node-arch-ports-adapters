import { v4 as uuid } from "uuid";
import { ProductInterface, ProductStatus } from "./types/product";

export default class Product implements ProductInterface {
  private id: string;
  private name: string;
  private price: number;
  private status: ProductStatus = ProductStatus.DISABLE;

  constructor(name: string, price: number) {
    this.id = uuid();
    this.name = name;
    this.price = price;
  }

  enable(): void {
    if (this.price > 0) {
      this.status = ProductStatus.ENABLE;
      return;
    }
    throw new Error(
      "the price must be greater than zero to enable the product"
    );
  }

  disable(): void {
    if (this.price === 0) {
      this.status = ProductStatus.DISABLE;
      return;
    }
    throw new Error("the price must be zero to disable the product");
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  getStatus(): ProductStatus {
    return this.status;
  }
}
