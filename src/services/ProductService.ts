import { Product } from '../models/Product'

export class ProductService {
  static async getProducts (): Promise<Product[]> {
    // appel API
    const response = await fetch('https://fakestoreapi.com/products')
    const json = await response.json()
    const products: Product[] = []

    // stockage des données
    json.forEach((p:any) => {
      products.push(new Product(
        p.id,
        p.title,
        p.price,
        p.description,
        p.category,
        p.image,
        p.rating
      ))
    })

    // envoie des données
    return products.sort(function compare (a: Product, b: Product) {
      if (a.rating.rate > b.rating.rate) return -1
      if (a.rating.rate < b.rating.rate) return 1
      return 0
    })
  }
}
