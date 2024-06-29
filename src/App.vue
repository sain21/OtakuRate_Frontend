<template>
  <div>
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavbarComponent.vue';
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

body {
  background-color: #121212;
  color: #ffffff;
}

.main-content {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1e1e1e;
  box-shadow: 0 4px 800px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
</style>
