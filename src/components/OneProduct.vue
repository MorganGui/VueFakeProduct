<template>
  <div class="product">
    <div>{{ product.title }}</div>
    <div>{{ product.category }}</div>
  </div>
</template>

<script lang="ts">
import { Product } from '@/models/Product'

export default {
  name: 'OneProduct',
  props: {
    product: Product
  }
}

</script>

<style lang="sass" scoped>
.product
  width: 356px
  height: 150px
  margin: 5px 10px
  padding: 5px
  box-sizing: border-box

  background-color: #fff
  background-size: cover
  background-repeat: no-repeat
  background-position: center center
  border-radius: 15px
</style>
