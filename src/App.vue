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
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
body {
  margin: 0;
  overflow-x: auto;
  overflow-y: auto;
}
body::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
  background: #080A12;
}
body::-webkit-scrollbar-thumb {
  background-color: #2C3041;
  border-radius: 12px;
}
body::-webkit-scrollbar-thumb:hover {
  background-color: #3C4051;
}
.page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  /* background: radial-gradient(#080A12, #2C3041); */
  background: linear-gradient(90deg, #080A12, #2C3041, #080A12);
  user-select: none;

  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 0%;
  padding-top: 2%;
  box-sizing: border-box;
}
</style>
