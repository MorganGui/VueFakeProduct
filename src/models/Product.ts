import { Rating } from './Rating'

export class Product {
  id = 0
  title = ''
  price = 0
  description = ''
  category = ''
  image = ''
  rating = new Rating(0, 0)

  constructor (id: number, title: string, price: number, description: string, category: string, image: string, rating: Rating) {
    this.id = id
    this.title = title
    this.price = price
    this.description = description
    this.category = category
    this.image = image
    this.rating = rating
  }
}
