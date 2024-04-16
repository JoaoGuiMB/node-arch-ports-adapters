import { Database } from "sqlite3";
import {
  ProductInterface,
  ProductPersistenceInterface,
} from "../../app/product/entities/types/product";
import Product from "../../app/product/entities/product";
import { ProductDto, bindProductDto } from "./product.dto";

interface ProductDb {
  db: Database;
}

export default class ProductAdapter
  implements ProductDb, ProductPersistenceInterface
{
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async get(id: string) {
    const sql = `SELECT * FROM products WHERE id = ?`;

    return new Promise<Product | undefined>((resolve, reject) => {
      this.db.get(sql, [id], (err, row: ProductDto | undefined) => {
        if (err) {
          reject(err);
          return undefined;
        }
        if (!row) {
          resolve(undefined);
          return undefined;
        }
        const product = bindProductDto(row);
        resolve(product);
      });
    });
  }

  async save(product: Product) {
    const row = await this.get(product.getId());
    if (row) {
      const sql = `UPDATE products SET name = ?, price = ?, status = ? WHERE id = ?`;
      this.db.run(sql, [
        product.getName(),
        product.getPrice(),
        product.getStatus(),
        product.getId(),
      ]);
    } else {
      const sql = `INSERT INTO products (id, name, price, status) VALUES (?, ?, ?, ?)`;
      this.db.run(sql, [
        product.getId(),
        product.getName(),
        product.getPrice(),
        product.getStatus(),
      ]);
    }
    return product;
  }
}
