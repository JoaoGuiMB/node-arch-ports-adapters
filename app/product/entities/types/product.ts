import Product from "../product";

export enum ProductStatus {
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
}

export interface ProductInterface {
  enable(): void;
  disable(): void;
  getId(): string;
  getName(): string;
  getPrice(): number;
  setPrice(price: number): void;
  getStatus(): string;
}

export interface ProductReader {
  get(id: string): Promise<Product | undefined>;
}

export interface ProductWriter {
  save(product: Product): Promise<Product>;
}

export interface ProductPersistenceInterface
  extends ProductReader,
    ProductWriter {}
