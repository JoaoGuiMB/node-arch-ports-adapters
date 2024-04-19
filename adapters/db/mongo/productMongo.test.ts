import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect, afterAll } from "vitest";
import ProductAdapter from "./productRepo";
import Product from "../../../app/product/entities/product";

const mongo = await MongoMemoryServer.create();
const uri = mongo.getUri();
mongoose.connect(uri);

describe("ProductDb unit tests", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should get a product", async () => {
    const product = new Product("product10", 10);
    const productAdapter = new ProductAdapter();
    const savedProduct = await productAdapter.save(product);

    const productFound = await productAdapter.get(savedProduct.getId());

    expect(productFound).toBeDefined();
  });

  it("should try to get a product that does not exist", async () => {
    const productAdapter = new ProductAdapter();
    const product = await productAdapter.get("2");
    expect(product).toBeUndefined();
  });

  it("should create a product", async () => {
    const product = new Product("product11", 10);
    const productAdapter = new ProductAdapter();
    const savedProduct = await productAdapter.save(product);
    expect(savedProduct).toBe(product);
  });

  it("should update a product", async () => {
    const product = new Product("product12", 10);
    const productAdapter = new ProductAdapter();
    await productAdapter.save(product);
    product.setPrice(20);
    const savedProduct = await productAdapter.save(product);
    expect(savedProduct).toBe(product);
  });
});
