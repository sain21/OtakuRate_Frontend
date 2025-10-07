<template>
  <nav class="navbar">
    <div class="nav-left">
      <RouterLink to="/" class="nav-brand">OtakuRate</RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/animes" class="nav-link">Anime</RouterLink>
        <RouterLink to="/watchlist" class="nav-link">Watchlist</RouterLink>
        <RouterLink to="/rate" class="nav-link">Rate</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </div>
    </div>
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
  background-color: #1e1e1e;
  display: flex;
  justify-content: flex-start; /* alles linksbündig */
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 2px solid #24C484;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

/* Container für Logo + Links */
.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem; /* Abstand zwischen Logo und Links */
}

.nav-brand {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
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
