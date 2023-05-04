<script setup lang="ts">
import HelloWorld from './components/HelloWorld/HelloWorld.vue'
import viteLogo from '@assets/images/vue.svg'

console.log(viteLogo,  'viteLogo')
</script>

<template>
  <div class="app__wrapper">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img class="logo vue" alt="Vue logo" :src="`${viteLogo}`"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.app__wrapper {
  background: url('@assets/images/vue.svg') no-repeat;
  background-size: 100% 100%;
}
</style>
