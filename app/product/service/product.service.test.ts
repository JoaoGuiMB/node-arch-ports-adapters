import { describe, it, expect, vi, afterEach } from "vitest";
import Product from "../entities/product";
import ProductService from "./product.service";
import { ProductPersistenceInterface } from "../entities/types/product";
const createdProduct = new Product("product", 10);
vi.mock("../entities/types/product");
vi.mock("../entities/product", async (importOriginal) => {
  const mod = await importOriginal();
  return mod;
});

const persistence: ProductPersistenceInterface = {
  get: () => {
    return createdProduct;
  },
  save: (product: Product) => {
    return product;
  },
};

describe("ProductService unit tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should get a product", () => {
    const mockedPersistence = vi.mocked(persistence.get);
    const productService = new ProductService(persistence);
    const result = productService.get("1");
    expect(result).toBe(createdProduct);
  });

  it("should create a product", () => {
    const mockedPersistence = vi.mocked(persistence.save);
    const productService = new ProductService(persistence);
    const result = productService.create("product", 10);
    expect(result.getName()).toBe(createdProduct.getName());
  });

  it("should enable a product", () => {
    const mockedPersistence = vi.mocked(persistence.save);
    const productService = new ProductService(persistence);
    const result = productService.enable(createdProduct);
    expect(result.getStatus()).toBe("ENABLE");
  });

  it("should disable a product", () => {
    const mockedPersistence = vi.mocked(persistence.save);
    const productService = new ProductService(persistence);
    productService.enable(createdProduct);
    createdProduct.setPrice(0);
    const result = productService.disable(createdProduct);
    expect(result.getStatus()).toBe("DISABLE");
  });
});
