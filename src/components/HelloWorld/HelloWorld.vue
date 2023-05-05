<script setup lang="ts">
import { ref } from 'vue'
import Logo1 from '@assets/icons/logo-1.svg'
import Logo2 from '@assets/icons/logo-2.svg'
import Logo3 from '@assets/icons/logo-3.svg'

console.log(Logo1, Logo2, Logo3)

// import exampleJSON from '@assets/json/example.json'
// import init from './fib.wasm?init';


// console.log(exampleJSON, 'exampleJSON')

// import Worker from './example.js?worker';
// // 1. 初始化 Worker 实例
// const worker = new Worker();
// // 2. 主线程监听 worker 的信息
// worker.addEventListener('message', (e) => {
//   console.log(e);
// });


// init().then((instance) => {
//   const fibFunc = instance.exports.fib;
//   console.log('Fib result:', fibFunc);
// });

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="less">
@import url('@src/components/HelloWorld/style.less');
.read-the-docs {
  color: #888;
}
</style>