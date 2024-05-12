<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/forum">Forum</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #d8b2d1;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}
.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  color: black;
  background-color: white;

}
</style>
