import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "sqlite3";
import ProductAdapter from "./product";
import Product from "../../app/product/entities/product";

describe("ProductDb unit tests", () => {
  let db = {} as Database;
  beforeAll(() => {
    db = new Database("sqlite.db:memory:testssqlite.db");
  });

  afterAll(() => {
    db.close();
  });

  it("should get a product", async () => {
    db.run(
      'INSERT INTO products (id, name, price, status) VALUES ("1", "product", 10, "ENABLE")'
    );
    const productAdapter = new ProductAdapter(db);
    const product = await productAdapter.get("1");
    expect(product).toBeDefined();
  });

  it("should try to get a product that does not exist", async () => {
    const productAdapter = new ProductAdapter(db);
    const product = await productAdapter.get("2");
    expect(product).toBeUndefined();
  });

  it("should create a product", async () => {
    const product = new Product("product", 10);
    const productAdapter = new ProductAdapter(db);
    const savedProduct = await productAdapter.save(product);
    expect(savedProduct).toBe(product);
  });

  it("should update a product", async () => {
    const product = new Product("product", 10);
    const productAdapter = new ProductAdapter(db);
    await productAdapter.save(product);
    product.setPrice(20);
    const savedProduct = await productAdapter.save(product);
    expect(savedProduct).toBe(product);
  });
});
