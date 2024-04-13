import { describe, it, expect } from "vitest";
import Product from "./product";

describe("Product unit tests", () => {
  it("should enable a product", () => {
    const product = new Product("product", 10);
    product.enable();
    expect(product.getStatus()).toBe("ENABLE");
  });

  it("should throw an error when enabling a product with a price less than or equal to 0", () => {
    const product = new Product("product", 0);
    expect(() => {
      product.enable();
    }).toThrow("the price must be greater than zero to enable the product");
  });

  it("should disable a product", () => {
    const product = new Product("product", 0);
    product.disable();
    expect(product.getStatus()).toBe("DISABLE");
  });

  it("should throw an error when disabling a product with a price greater than 0", () => {
    const product = new Product("product", 10);
    expect(() => {
      product.disable();
    }).toThrow("the price must be zero to disable the product");
  });

  it("should return the product id", () => {
    const product = new Product("product", 10);
    expect(product.getId()).toBeDefined();
  });

  it("should return the product name", () => {
    const product = new Product("product", 10);
    expect(product.getName()).toBe("product");
  });

  it("should return the product price", () => {
    const product = new Product("product", 10);
    expect(product.getPrice()).toBe(10);
  });

  it("should return the product status", () => {
    const product = new Product("product", 10);
    expect(product.getStatus()).toBe("DISABLE");
  });
});
