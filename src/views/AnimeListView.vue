<template>
  <div>
    <header>
      <h1>Anime Database</h1>
      <form class="search-box" @submit.prevent="handleSearch">
        <input
          type="search"
          class="search-field"
          placeholder="Search for anime..."
          v-model="searchQuery"
        />
        <button type="submit" class="search-button">Search</button>
        <button type="button" class="reset-button" @click="resetSearch">X</button>
      </form>
    </header>
    <nav class="alphabet-nav">
      <ul>
        <li v-for="letter in alphabet" :key="letter" @click="searchByLetter(letter)">{{ letter }}</li>
      </ul>
    </nav>
    <main>
      <div class="cards" v-if="sortedAnimeList.length > 0">
        <CardComponent
          v-for="anime in sortedAnimeList"
          :key="anime.mal_id"
          :anime="anime"
        />
      </div>
      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
      <div class="no-results" v-else>
        <h3>No results found</h3>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CardComponent from '@/components/CardComponent.vue';

const searchQuery = ref("");
const animeList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const alphabet = ref(['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

const fetchAnime = async (query = searchQuery.value) => {
  try {
    let url = `https://api.jikan.moe/v4/anime?page=${currentPage.value}&order_by=members&sort=desc`;
    if (query.trim() !== "") {
      url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${currentPage.value}&order_by=members&sort=desc`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const modifiedAnimeList = data.data.map(anime => ({
      ...anime,
      image_url: anime.images.jpg.large_image_url
    }));
    animeList.value = modifiedAnimeList;
    totalPages.value = data.pagination.last_visible_page;
  } catch (error) {
    console.error('Error fetching anime:', error);
  }
};

watch([searchQuery, currentPage], () => fetchAnime(), { immediate: true });

const sortedAnimeList = computed(() => {
  let sortedList = [...animeList.value];
  sortedList.sort((a, b) => b.popularity - a.popularity); // Sort by popularity descending
  return sortedList;
});

const handleSearch = () => {
  currentPage.value = 1; // Reset to first page when searching
  fetchAnime();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  currentPage.value = 1;
  fetchAnime();
};

const searchByLetter = (letter) => {
  searchQuery.value = letter === '#' ? '' : letter;
  currentPage.value = 1;
  fetchAnime(searchQuery.value);
};

</script>

<style scoped>
.anime-view {
  text-align: center;
}

header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #24C484;
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-field {
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #24C484;
  color: white;
  cursor: pointer;
  margin-left: 1rem;
}

.reset-button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #ff0000;
  color: white;
  cursor: pointer;
  margin-left: 0.5rem;
}

.alphabet-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.alphabet-nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.5rem;
}

.alphabet-nav li {
  cursor: pointer;
  padding: 0.5rem;
  background: #333;
  color: #fff;
  border-radius: 4px;
}

.alphabet-nav li:hover {
  background: #555;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #24C484;
  color: white;
  cursor: pointer;
  margin: 0 0.5rem;
}

.no-results {
  text-align: center;
  padding: 50px;
}

.no-results h3 {
  color: #888;
  font-size: 1.5rem;
  font-weight: 400;
}
</style>
