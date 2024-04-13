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
  getStatus(): string;
}
