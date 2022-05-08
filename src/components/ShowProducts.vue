<template>
  <div class="container">
    <div class="categories">
      <div class="title">TOP <input type="number" v-model="nbShow" v-on:change="onNbShowChange($event)"> RATINGS :</div>
      <div class="products">
        <div v-for="p in bestProducts" :key="p.id">
          <OneProduct v-bind:product="p" v-bind:cat="'all'"/>
          <div class="price">{{ p.price }} $</div>
        </div>
      </div>
    </div>

    <div class="categories" v-for="c in categories" :key="c">
      <div class="title">{{ c.toUpperCase() }} :</div>
      <div class="products">
        <div v-for="p in products" :key="p.id">
          <OneProduct v-if="c == p.category" v-bind:product="p"  v-bind:cat="c"/>
          <div class="price" v-if="c == p.category">{{ p.price }} $</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductService } from '@/services/ProductService'
import { Product } from '@/models/Product'
import OneProduct from '@/components/OneProduct.vue'

let nbShow = 10
let products: Product[] = []
let bestProducts: Product[] = []

export default {
  name: 'ShowProducts',
  components: {
    OneProduct
  },
  async setup () {
    /** Vérification de la taille de l'écran */
    let mobile = false
    if (window.innerWidth < 900) mobile = true

    products = await ProductService.getProducts()

    /** Liste des categories */
    const categories: string[] = []
    products.forEach((p: Product) => {
      if (!categories.includes(p.category)) categories.push(p.category)
    })

    /** Produit les mieux notés */
    for (let i = 0; i < nbShow; i++) {
      bestProducts[i] = products.sort(function compare (a: Product, b: Product) {
        if (a.rating.rate > b.rating.rate) return -1
        if (a.rating.rate < b.rating.rate) return 1
        return 0
      })[i]
    }

    return {
      products,
      categories,
      bestProducts,
      mobile,
      nbShow
    }
  },
  methods: {
    onNbShowChange (event: InputEvent) {
      if (event.target) nbShow = event.target.value
      bestProducts = []
      for (let i = 0; i < nbShow; i++) {
        bestProducts[i] = products.sort(function compare (a: Product, b: Product) {
          if (a.rating.rate > b.rating.rate) return -1
          if (a.rating.rate < b.rating.rate) return 1
          return 0
        })[i]
      }
      console.log(bestProducts)
      return {
        bestProducts
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  user-select: none
.categories
  width: 100%
  .title
    margin: 25px 5% 5px 5%
    font-size: 20px
    font-weight: 700
    input
      background: none
      border-style: none
      width: 40px
      color: #fff
      font-size: 20px
      font-weight: 700
      text-align: center
      transition: 200ms
      &:hover, &:focus
        margin-right: 0

  .products
    display: flex
    overflow-y: hidden
    overflow-x: auto
    box-sizing: border-box
    padding: 50px calc(5% + 15px) 25px calc(5% + 15px)
    margin-top: -50px
    div
      display: flex
      flex-direction: column
      gap: 25px
      .price
        z-index: 1
        text-align: center
        font-size: 17.5px
        font-weight: 550

/** Pour mobile */
@media (min-width: 900px)
  .products
    &::-webkit-scrollbar-track
      background: #000
      border-radius: 12px
    &::-webkit-scrollbar
      width: 12px
    &::-webkit-scrollbar-thumb
      background-color: #fff
      border-radius: 12px
      &:hover
        background-color: #ddd
  .categories
    .title
      input
        margin-right: -15px
</style>
