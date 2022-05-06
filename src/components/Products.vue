<template>
</template>

<script lang="ts">
import { ProductService } from '@/services/ProductService'
import { Product } from '@/models/Product'

export default {
  name: 'OneProduct',
  async setup () {
    const title = 'un produit'

    const products: Product[] = await ProductService.getProducts()

    return {
      title
    }
  }
}
</script>

<style lang="sass">
</style>
