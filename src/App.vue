<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <AppNavbar />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

#app {
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

}
</style>
