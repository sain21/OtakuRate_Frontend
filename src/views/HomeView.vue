<template>
  <div class="home">
    <h1>Welcome to OtakuRate</h1>

    <div class="news">
      <h2>Latest Anime News</h2>
      <ul>
        <li v-for="article in paginatedNews" :key="article.mal_id" class="news-item">
          <a :href="article.url" target="_blank" class="news-title" :aria-label="'Read more about ' + article.title" v-tooltip="'Click to read more'">{{ article.title }}</a>
          <img :src="article.image_url" :alt="article.title" class="news-image" v-if="article.image_url" loading="lazy"/>
          <p>{{ article.synopsis }}</p>
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const newsArticles = ref([]);
const currentPage = ref(1);
const pageSize = 10;

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return newsArticles.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(newsArticles.value.length / pageSize);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop();
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/anime?q=news');
    if (!response.ok) {
      throw new Error('Failed to fetch news. Please try again later.');
    }
    const data = await response.json();
    newsArticles.value = data.data.map(article => ({
      mal_id: article.mal_id,
      title: article.title,
      synopsis: article.synopsis,
      url: article.url,
      image_url: article.images?.jpg?.image_url
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});
</script>
<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  background-color: #1c1c1c;
  color: #e0e0e0;
  min-height: 100vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #24C484;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}

p {
  font-size: 1.5rem;
}

.news {
  margin-top: 2rem;
}

h2 {
  font-size: 2rem;
  color: #24C484;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

.news-item {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: left;
  background-color: #333333;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.news-title {
  color: #24C484;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.news-title:hover {
  text-decoration: underline;
}

.news-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

button {
  background-color: #24C484;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

button:hover {
  background-color: #1e9f75;
}

button:disabled {
  background-color: #555555;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .home {
    padding: 1rem;
  }
  h1, h2 {
    font-size: 2rem;
  }
}

@media (min-width: 1600px) {
  .home {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
