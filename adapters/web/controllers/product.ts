import Product from "../../../app/product/entities/product";
import { ProductInterface } from "../../../app/product/entities/types/product";
import { ProductServiceInterface } from "../../../app/product/service/types/product";

interface ProductController {
  productService: ProductServiceInterface;
  get: (id: string) => Promise<ProductInterface | null>;
  create: (product: Product) => Promise<ProductInterface | undefined>;
  enable: (id: string) => Promise<ProductInterface | null>;
  disable: (id: string) => Promise<ProductInterface | null>;
}

export default class ProductControllerAdapter implements ProductController {
  productService: ProductServiceInterface;

  constructor(productService: ProductServiceInterface) {
    this.productService = productService;
  }

  async get(id: string) {
    const product = await this.productService.get(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return await this.productService.get(id);
  }

  async create(product: ProductInterface) {
    return await this.productService.create(
      product.getName(),
      product.getPrice()
    );
  }

  async enable(id: string) {
    const product = await this.productService.get(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return await this.productService.enable(product);
  }

  //todo: implement error handling
  async disable(id: string) {
    try {
      const product = await this.productService.get(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return await this.productService.disable(product);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
