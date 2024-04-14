import { Database } from "sqlite3";
import { ProductInterface } from "../../app/product/entities/types/product";
import Product from "../../app/product/entities/product";

interface ProductDb {
  db: Database;
  get: (id: string) => Promise<ProductInterface | undefined>;
  save: (product: Product) => Promise<ProductInterface | undefined>;
}

export default class ProductAdapter implements ProductDb {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async get(id: string) {
    const sql = `SELECT * FROM products WHERE id = ?`;

    return new Promise<ProductInterface | undefined>((resolve, reject) => {
      this.db.get(sql, [id], (err, row: ProductInterface | undefined) => {
        if (err) {
          reject(err);
          return undefined;
        }

        resolve(row);
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
