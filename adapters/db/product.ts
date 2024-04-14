import { Database } from "sqlite3";
import { ProductInterface } from "../../app/product/entities/types/product";
import Product from "../../app/product/entities/product";

interface ProductDb {
  db: Database;
  get: (id: string) => Promise<ProductInterface | undefined>;
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
}
