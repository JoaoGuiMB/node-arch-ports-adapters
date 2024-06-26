import { Schema } from "mongoose";
import { ProductStatus } from "../../../../app/product/entities/types/product";

const ProductSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.DISABLE,
  },
});

export default ProductSchema;
