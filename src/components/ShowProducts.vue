<template>
  <div class="container">
    <div class="cateories">
      <p class="title">top rated :</p>
      <div class="products">
        <div v-for="p in bestProducts" :key="p.id">
          <OneProduct v-bind:product="p"/>
          <div class="price">{{ p.price }} $</div>
        </div>
      </div>
    </div>

    <div class="cateories" v-for="(c, index) in categories" :key="index">
      <p class="title">{{ c.toUpperCase() }} :</p>
      <div class="products">
        <div v-for="p in products" :key="p.id">
          <OneProduct v-if="c == p.category" v-bind:product="p"/>
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

export default {
  name: 'ShowProducts',
  components: {
    OneProduct
  },
  async setup () {
    let mobile = false
    if (window.innerWidth < 900) mobile = true

    const products: Product[] = await ProductService.getProducts()

    /** Liste des categories */
    const categories: string[] = []
    products.forEach((p: Product) => {
      if (!categories.includes(p.category)) categories.push(p.category)
    })

    /** Produit les mieux notés */
    const bestProducts: Product[] = []
    for (let i = 0; i < 5; i++) {
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
      mobile
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
.cateories
  width: 100%
  .title
    font-size: 20px
    font-weight: 700
  .products
    display: flex
    overflow-y: hidden
    overflow-x: auto
    box-sizing: border-box
    padding: 50px 15px 25px 15px
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
</style>
