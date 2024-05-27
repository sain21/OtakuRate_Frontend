<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div style="color:red">Hallo Welt!</div>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/rate">Rate</RouterLink>
  </header>
  <RouterView />
</template>
}<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

header a {
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}



nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>