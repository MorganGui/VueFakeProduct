<template>
  <div class="categories">
    <div class="title">TOP 10 RATINGS :</div>
    <div class="products">
      <div v-for="p in topProducts" :key="p.id">
        <OneProduct :product="p" :cat="'all'"/>
        <div class="price">{{ p.price }} $</div>
      </div>
    </div>
  </div>

  <div class="categories" v-for="c in categories" :key="c">
    <div class="title">{{ c.toUpperCase() }} :</div>
    <div class="products">
      <div v-for="p in products" :key="p.id">
        <OneProduct v-if="c == p.category" :product="p"  :cat="c"/>
        <div class="price" v-if="c == p.category">{{ p.price }} $</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductService } from '@/services/ProductService'
import { Product } from '@/models/Product'
import OneProduct from '@/components/OneProduct.vue'

let products: Product[] = []
const topProducts: Product[] = []

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

    /** Produit affiché en haut */
    for (let i = 0; i < 10; i++) {
      if (products.length > i) topProducts[i] = products[i]
    }

    return {
      products,
      categories,
      topProducts,
      mobile
    }
  }
}
</script>

<style lang="sass" scoped>
.categories
  width: 100%
  .title
    margin: 25px 5% 5px 5%
    font-size: 20px
    font-weight: 700

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
@media (max-width: 900px)
  .categories .title
    font-size: 18px
/** Pour PC */
@media (min-width: 901px)
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
</style>
