<template>
  <div class="categories">
    <div class="title">TOP <input type="number" id="txtNbShow" v-model="nbShow" v-on:change="onSearchChange()"> RATINGS : <input type="text" id="txtSearch" placeholder="rechercher" v-model="txtSearch" v-on:change="onSearchChange()"></div>
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

let nbShow = 10
let products: Product[] = []
let topProducts: Product[] = []
let txtSearch = 'Mens'

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
    /** Produit affiché en haut */
    const categories: string[] = []
    const tmpProducts: Product[] = []
    products.forEach((p: Product) => {
      if (!categories.includes(p.category)) categories.push(p.category)
      if (p.title.toLowerCase().includes(txtSearch.toLowerCase())) tmpProducts.push(p)
    })

    for (let i = 0; i < nbShow; i++) {
      if (tmpProducts.length > i) topProducts[i] = tmpProducts[i]
    }

    return {
      products,
      categories,
      topProducts,
      mobile,
      nbShow,
      txtSearch
    }
  },
  methods: {
    onSearchChange () {
      nbShow = +(document.getElementById('txtNbShow') as HTMLInputElement).value
      txtSearch = (document.getElementById('txtSearch') as HTMLInputElement).value
      topProducts = []
      const tmpProducts: Product[] = []
      products.forEach((p: Product) => {
        if (p.title.toLowerCase().includes(txtSearch.toLowerCase())) tmpProducts.push(p)
      })
      for (let i = 0; i < nbShow; i++) {
        if (tmpProducts.length > i - 1) topProducts[i] = tmpProducts[i]
      }
      console.log(topProducts)
      return {
        topProducts
      }
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
    input
      background: none
      border-style: none
      color: #fff
      font-size: 20px
      font-weight: 700
      text-align: center
      transition: 200ms
      &:hover, &:focus
        margin-right: 0
      &:nth-child(1)
        width: 40px
      &:nth-child(2)
        width: 150px
        margin-left: 5px

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
    input
      font-size: 18px
    input:nth-child(1)
      width: 25px
    input:nth-child(2)
      width: calc(100vw - 200px)
      max-width: 200px
      margin-left: 0px
      margin-right: -20px
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
  .categories .title input
        margin-right: -15px
</style>
