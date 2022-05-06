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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.page {
  background-image: url('@/assets/asfalt.png');
  background-color: #ccc;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
