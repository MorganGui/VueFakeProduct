<template>
  <div class="page">
    <Suspense>
      <ShowProducts />
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShowProducts from './components/ShowProducts.vue'

export default defineComponent({
  name: 'App',
  components: {
    ShowProducts
  }
})
</script>

<style>
body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
body::-webkit-scrollbar {
  display: none;
}
.page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  /* background: radial-gradient(#080A12, #2C3041); */
  background: radial-gradient(#2C3041, #080A12);

  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8vh 5vw;
  padding-top: 2vh;
  box-sizing: border-box;
}
</style>
