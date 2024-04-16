import Product from "../../app/product/entities/product";
import { ProductStatus } from "../../app/product/entities/types/product";

export interface ProductDto {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
}

export const bindProductDto = (product: ProductDto): Product => {
  const productEntity = new Product(product.name, product.price);
  productEntity.setId(product.id);
  productEntity.setStatus(product.status);
  return productEntity;
};
