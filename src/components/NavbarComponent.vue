<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-brand">OtakuRate</RouterLink>
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/animes" class="nav-link">Anime</RouterLink>
      <RouterLink to="/watchlist" class="nav-link">Watchlist</RouterLink>
      <RouterLink to="/rate" class="nav-link">Rate</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  padding: 1rem 2rem; /* Increase padding to make navbar wider */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid #24C484;
}

.nav-brand {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links {
  display: flex;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0 1rem;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #24C484;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  color: #24C484;
}
</style>
