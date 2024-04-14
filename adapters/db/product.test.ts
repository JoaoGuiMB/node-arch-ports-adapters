import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "sqlite3";
import ProductAdapter from "./product";

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
});
