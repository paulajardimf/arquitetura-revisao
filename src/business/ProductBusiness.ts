import { ProductDatabase } from "../database/ProductDatabase";
import { Product } from "../models/Product";

export class ProductBusiness {
  constructor(private productDatabase: ProductDatabase) {}

  public getProducts = async (q: string | undefined) => {
    const { productsDB, brandsDB } =
      await this.productDatabase.getProductsAndBrands(q);

    const products = productsDB.map((productDB) => {
      const product = new Product (
        productDB.id,
        productDB.name,
        productDB.price,
        getBrand(productDB.brand_id)
      )

      return product.toBusinessModel()
    });

    function getBrand(brandId: string) {
      const brand = brandsDB.find((brandDB) => {
        return brandDB.id === brandId;
      });

      return {
        id: brand.id,
        name: brand.name,
      };
    }

    // res.status(200).send(products)
    return products;
  };
}
