<template>
  <div class="container">
    <div class="categories" @click="selectCategory(0)">
      <div class="title">ALL PRODUCTS</div>
    </div>
    <div class="categories" v-for="(c, index) in categories" :key="index" @click="selectCategory(index+1)">
      <div class="title">{{ c.toUpperCase() }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductService } from '@/services/ProductService'
import { Product } from '@/models/Product'

export default {
  name: 'ShowProducts',
  components: {
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
  },
  methods: {
    selectCategory: function (i: number) {
      Array.from(document.getElementsByClassName('categories')).forEach((div: any) => {
        div.animate([
          {},
          { margin: '-87.5px' }
        ], {
          duration: 250,
          fill: 'forwards'
        })
      })
      document.getElementsByClassName('categories')[i].animate([
        {},
        { zIndex: 1, position: 'fixed', cursor: 'defaut' }
      ], {
        delay: 250,
        duration: 0,
        fill: 'forwards'
      })
      document.getElementsByClassName('categories')[i].animate([
        {},
        { width: '100vw', height: '100vh', borderRadius: '0' }
      ], {
        delay: 250,
        duration: 250,
        fill: 'forwards'
      })
      document.getElementsByClassName('title')[i].animate([
        {},
        { margin: '-45% 0 0 0', fontSize: '30px' }
      ], {
        delay: 250,
        duration: 250,
        fill: 'forwards'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  gap: 25px
  .categories
    border-radius: 50%
    background: #ffff
    aspect-ratio: 1 / 1
    width: 150px
    display: flex
    justify-content: center
    align-items: center
    padding: 15px
    box-sizing: border-box
    transition: 250ms
    user-select: none
    cursor: pointer
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 35px inset
    overflow: hidden
    .title
      text-align: center
      font-size: 18px
      font-weight: 600
    // &:hover
    //   transform: scale(1.3)
    //   margin: 10px
    //   box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0px inset
</style>
