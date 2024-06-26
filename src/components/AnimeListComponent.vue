<script setup lang="ts">
import { ref } from 'vue';

const animes = ref([
  { mal_id: 1, title: 'Anime 1' },
  { mal_id: 2, title: 'Anime 2' },
  { mal_id: 3, title: 'Anime 3' },
  { mal_id: 4, title: 'Anime 4' },
  { mal_id: 5, title: 'Anime 5' },
  { mal_id: 6, title: 'Anime 6' },
  { mal_id: 7, title: 'Anime 7' },
  { mal_id: 8, title: 'Anime 8' },
  { mal_id: 9, title: 'Anime 9' },
  { mal_id: 10, title: 'Anime 10' },
]);
</script>

<template>
  <div>
    <h1>Anime Liste</h1>
    <ul>
      <li v-for="anime in animes" :key="anime.mal_id">
        {{ anime.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 50%;
  text-align: center;
}

li:hover {
  background-color: #f5f5f5;
}
</style>