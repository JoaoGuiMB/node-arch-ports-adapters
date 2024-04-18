import mongoConnection from "../connection";
import ProductSchema from "../schemas/ProductSchema";

const ProductModel = mongoConnection.model("Products", ProductSchema);

export default ProductModel;
