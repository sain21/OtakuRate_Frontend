<template>
  <div class="card">
    <a :href="anime.url" target="_blank">
      <img :src="anime.image_url" :alt="`${anime.title} Poster`" class="card-image">
      <h3>{{ anime.title }}</h3>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  anime: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.card {
  flex: 1 1 calc(20% - 1rem); /* Adjust width to fit 5 cards in a row */
  max-width: calc(20% - 1rem); /* Ensure cards do not exceed 5 in a row */
  margin: 0.5rem;
  text-align: center;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s, box-shadow 0.4s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
}

h3 {
  padding: 1rem;
  color: #24C484;
  transition: color 0.4s;
}

.card a {
  text-decoration: none;
  color: inherit;
}
</style>
