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
    <main>
      <div class="cards" v-if="animeList.length > 0">
        <CardComponent
          v-for="anime in animeList"
          :key="anime.mal_id"
          :anime="anime"
        />
      </div>
      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span v-for="page in pagesToShow" :key="page" @click="goToPage(page)" :class="{'active-page': currentPage === page}">{{ page }}</span>
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
const animePerPage = 10;
const totalResults = ref(0);

const fetchAnime = async (query = searchQuery.value, page = currentPage.value) => {
  try {
    let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=${animePerPage}&order_by=members&sort=desc`;
    if (query.trim() !== "") {
      url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${animePerPage}&order_by=members&sort=desc`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    animeList.value = data.data.map(anime => ({
      ...anime,
      image_url: anime.images.jpg.large_image_url
    }));
    totalResults.value = data.pagination.items.total;
    totalPages.value = Math.ceil(totalResults.value / animePerPage);
  } catch (error) {
    console.error('Error fetching anime:', error);
  }
};

watch([searchQuery, currentPage], () => fetchAnime(), { immediate: true });

const handleSearch = () => {
  currentPage.value = 1; // Reset to first page when searching
  fetchAnime();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchAnime(searchQuery.value, currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchAnime(searchQuery.value, currentPage.value);
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  fetchAnime(searchQuery.value, currentPage.value);
};

const resetSearch = () => {
  searchQuery.value = "";
  currentPage.value = 1;
  fetchAnime();
};

const pagesToShow = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  const range = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }

  if (current - delta > 2) {
    pages.push('...');
  }

  pages.push(...range);

  if (current + delta < total - 1) {
    pages.push('...');
  }

  return [1, ...pages, total];
});
</script>
<style scoped>
.anime-view {
  text-align: center;
}

header {
  margin-bottom: 2rem;
  background-color: #1c1c1c;
  padding: 1rem 0;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #24C484;
  text-align: center;
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
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

.pagination span {
  cursor: pointer;
  margin: 0 0.2rem;
}

.active-page {
  font-weight: bold;
  text-decoration: underline;
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
