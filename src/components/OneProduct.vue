<template>
  <input type="checkbox" :id="productDomId" class="cboProduct" v-if="!mobile">
  <label :for="productDomId">

    <div class="desc" v-if="!mobile">
      <div>{{ filter(product.description, 250, 250) }}</div>
      <a href="#">more information</a>
    </div>
    <div class="product" v-bind:style="{ backgroundImage: 'url(' + product.image + ')' }">
      <div class="filter">
        <div class="title">{{ filter(product.title, 100, 45) }}</div>
        <div class="rate">
          <div class="stars">
            <svg v-for="index in fullStar" :key="index" class="fullStar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
            <svg v-for="index in halfStar" :key="index" class="halfStar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7zM288 376.4L288.1 376.3L399.7 435.9L378.4 309.6L469.2 219.8L343.8 201.4L288.1 86.85L288 87.14V376.4z"/></svg>
            <svg v-for="index in emptyStar" :key="index" class="emptyStar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>
          </div>
          <div v-if="product.rating.count > 1">{{ product.rating.count }} votes</div>
          <div v-else>{{ product.rating.count }} vote</div>
        </div>
      </div>
    </div>

  </label>
</template>

<script lang="ts">
import { Product } from '@/models/Product'

export default {
  name: 'OneProduct',
  props: {
    product: {
      required: true,
      type: Product
    },
    cat: {
      required: true,
      type: String
    }
  },
  /** Calcul des nombres d'étoiles pleine, vide et à moitié pleine */
  setup (props:any) {
    /** Vérification de la taille de l'écran */
    let mobile = false
    if (window.innerWidth < 900) mobile = true

    function getProduct () {
      return props.product
    }
    function getCat () {
      return props.cat
    }
    const fullStar = Math.trunc(getProduct().rating.rate + 0.25)
    const emptyStar = Math.trunc(5 - getProduct().rating.rate + 0.25)
    let halfStar = 0
    if (fullStar + emptyStar !== 5) halfStar = 1

    // Un identifiant tel que celui-ci permet de ne pas afficher la description du même produit que celui clicker mais qui se trouve dans "top rating".
    const productDomId = getProduct().id + getCat()

    return {
      fullStar,
      halfStar,
      emptyStar,
      productDomId,
      mobile
    }
  },
  methods: {
    /** La méthode "filter" permet de couper les textes trop longs et d'ajouter des points de suspension à la fin. */
    filter (text: string, length: number, lengthMobile: number) {
      if (window.innerWidth < 900 && text.length > lengthMobile) return text.slice(0, lengthMobile) + '...'
      else if (text.length > length) return text.slice(0, length) + '...'
      else return text
    }
  }
}

</script>

<style lang="sass" scoped>
.product
  width: 200px
  height: 200px
  max-width: 45vw
  max-height: 45vw
  margin: 5px 20px
  transform: translateZ(0)

  background-color: #fff
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  box-shadow: #000a 0 10px 25px -10px, #000c 0 10px 10px -10px

  transition: 500ms
  border-radius: 15px
  cursor: pointer
  &:hover
    transform: scale(1.1)
    box-shadow: #000a 0 10px 40px 15px, #000c 0 10px 10px -10px
    .filter
      opacity: 1
  /** Le filtre permet de grisé un produit pour affiché son nom et son évaluation */
  .filter
    width: 200px
    height: 200px
    max-width: 45vw
    max-height: 45vw
    background: #000a
    transition: 500ms
    opacity: 0

    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    padding: 15px
    box-sizing: border-box
    border-radius: 15px
    border: solid 5px #fff
    .title
      font-size: 15px
      font-weight: 550
      text-align: center
    .rate
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .stars
        text-align: center
        *
          fill: #FFD700
          width: 25px
          max-width: 4vw

.desc
  transition: 500ms
  width: 200px
  height: 200px
  max-width: 45vw
  max-height: 45vw
  margin: 5px 20px -205px 20px

  display: flex
  flex-direction: column
  justify-content: space-evenly
  align-items: center

  padding: 15px
  box-sizing: border-box
  border-radius: 15px
  background: #fff
  overflow: hidden

  text-align: center
  color: #000
  div
    width: 370px
.cboProduct
  display: none
@media (min-width: 900px)
  .cboProduct:checked ~ label
    > .desc
      padding-left: 230px
      width: 600px
    > .product
      margin-right: 420px
      transform: scale(1.1)
      box-shadow: #000a 0 10px 40px 15px, #000c 0 10px 10px -10px
      .filter
        opacity: 1

@media (max-width: 900px)
  .product
    &:hover
      transform: unset
</style>
