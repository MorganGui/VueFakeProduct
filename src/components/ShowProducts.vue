<template>
  <div class="container">
    <div class="cateories" v-for="(c, index) in categories" :key="index">
      <p class="title">{{ c.toUpperCase() }} :</p>
      <div class="products">
        <div v-for="p in products" :key="p.id">
          <OneProduct v-if="c == p.category" v-bind:product="p"/>
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
    const products: Product[] = await ProductService.getProducts()

    const categories: string[] = []
    products.forEach((p: Product) => {
      if (!categories.includes(p.category)) categories.push(p.category)
    })

    return {
      products,
      categories
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
.cateories
  &::-webkit-scrollbar
    display: none
  .title
    font-size: 25px
    font-weight: 700

  .products
    display: flex
</style>
