import { Router, Request } from "express";
import ProductControllerAdapter from "../controllers/product";
import ProductService from "../../../app/product/service/product.service";
import ProductAdapter from "../../db/product";
import sqlite3 from "sqlite3";
import { ProductInterface } from "../../../app/product/entities/types/product";
import Product from "../../../app/product/entities/product";
import ProductMongoRepository from "../../db/mongo/productRepo";

const productRouter = Router();
const db = new sqlite3.Database("sqlite.db");

const productController = new ProductControllerAdapter(
  new ProductService(new ProductMongoRepository())
);
interface ProductJson {
  id: string;
  name: string;
  price: number;
  status: string;
}

productRouter.post(
  "/",
  async (request: Request<{}, {}, ProductJson>, response) => {
    const { body } = request;
    const product = await productController.create(
      new Product(body.name, body.price)
    );
    return response.status(200).json({ data: product });
  }
);

productRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const product = await productController.get(id);
  return response.status(200).json({
    data: product,
  });
});

productRouter.get("/enable/:id", async (request, response) => {
  const { id } = request.params;
  const product = await productController.enable(id);
  return response.status(200).json({
    data: product,
  });
});

productRouter.get("/disable/:id", async (request, response) => {
  const { id } = request.params;
  const product = await productController.disable(id);
  return response.status(200).json({
    data: product,
  });
});

export default productRouter;
