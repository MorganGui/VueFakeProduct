<template>
  <span :data-descr="product.description">
    <div class="product" v-bind:style="{ backgroundImage: 'url(' + product.image + ')' }">
      <div class="filter">
        <div class="title">{{ product.title }}</div>
        <div class="rate">
        </div>
      </div>
    </div>
  </span>
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
  width: 250px
  aspect-ratio: 1 / 1
  margin: 5px 20px
  overflow: hidden

  background-color: #fff
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  box-shadow: #000a 0px 26px 30px -10px, #000c 0px 16px 10px -10px

  transition: 500ms
  border-radius: 15px
  cursor: pointer
  &::before, &::after
    content: ''
    top: 5px
    position: absolute
    width: 250px
    aspect-ratio: 1 / 1
    border-radius: 15px
    border: solid 3px #fff
    box-sizing: border-box
    z-index: 1
    transition: 500ms
    opacity: 0
  &::after
    background: #fff
    opacity: 1
    z-index: -1
  .filter
    width: 100%
    aspect-ratio: 1 / 1
    background: #000a
    transition: 500ms
    opacity: 0

    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    padding: 10px
    box-sizing: border-box
    .title
      font-size: 20px
      text-align: center

span[data-descr]
  position: relative
  cursor: pointer
  &:hover
    transform: scale(1.07)
    .product
      box-shadow: #000a 0 25px 50px 15px, #000c 0px 16px 10px -10px
      margin-right: 420px
      &::before, > .filter
        opacity: 1
      &::after
        border-top-right-radius: 0
        border-bottom-right-radius: 0
span[data-descr]:hover::after
  content: attr(data-descr)
  position: absolute
  left: 270px
  top: 5px
  width: 400px
  height: 250px
  box-sizing: border-box
  border: solid 3px #fff
  border-top-right-radius: 15px
  border-bottom-right-radius: 15px
  background-color: #fff
  color: #000
  font-size: 14px
  text-align: center
  padding: 15px
</style>
