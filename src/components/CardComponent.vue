<template>
  <div class="card">
    <img :src="anime.image_url" :alt="`${anime.title} Poster`">
    <h3>{{ anime.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    anime: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  flex: 1 1 33%;
  max-width: 33%;
  padding: 0 8px;
  margin-bottom: 16px;
}

.card img {
  width: 100%; /* Korrektur von 'widht' zu 'width' */
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: 0.4s;
}

.card h3 {
  padding: 16px;
  color: #313131;
  transition: .4s;
}

.card:hover img {
  transform: scale(1.05);
}

.card:hover h3 {
  color: #24C484;
}
</style>
