import Product from "../../../app/product/entities/product";
import { ProductPersistenceInterface } from "../../../app/product/entities/types/product";
import { bindProductDto } from "../product.dto";
import ProductModel from "./models/productModel";

export default class ProductMongoRepository
  implements ProductPersistenceInterface
{
  async get(id: string): Promise<Product | undefined> {
    const product = await ProductModel.findOne({ id });
    if (!product) return undefined;
    const productDTO = {
      id,
      name: product.name,
      price: product.price,
      status: product.status,
    };
    return bindProductDto(productDTO);
  }

  async save(product: Product) {
    const foundProduct = await ProductModel.findOne({ id: product.getId() });
    if (foundProduct) {
      await ProductModel.updateOne(
        { id: product.getId() },
        {
          name: product.getName(),
          price: product.getPrice(),
          status: product.getStatus(),
        }
      );
    } else {
      const productDTO = {
        id: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        status: product.getStatus(),
      };
      const newProduct = new ProductModel(productDTO);
      await newProduct.save();
    }
    return product;
  }
}
