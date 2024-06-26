<template>
  <main class="watchlist">
    <h1>My Anime Watchlist</h1>

    <p>Welcome to your personal Anime Watchlist page! Here you can add, track, and manage your favorite animes.</p>
    <p>Browse the Anime database and add new animes to your Watchlist. Manage the number of episodes you have watched and discover new recommendations.</p>
    <p>Enjoy exploring and managing your Anime collection!</p>

    <form @submit.prevent="searchAnime" class="search-form">
      <input type="text" placeholder="Search for an anime..." v-model="query" @input="handleInput" class="search-input"/>
      <button type="submit" class="search-button">Search</button>
    </form>


    <div class="results" v-if="search_results.length > 0">
      <div v-for="anime in search_results" :key="anime.mal_id" class="result">
        <img :src="anime.images.jpg.image_url" class="anime-image"/>
        <div class="details">
          <h3>{{ anime.title }}</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">{{ anime.synopsis.slice(0, 120) }}...</p>
          <span class="flex-1"></span>
          <button @click="addAnimetoWatchlist(anime)" class="button">Add to Watchlist</button>
        </div>
      </div>
    </div>

    <div class="myanime" v-if="my_watchlist.length > 0">
      <h2>My Watchlist</h2>
      <div v-for="anime in my_watchlist_asc" :key="anime.id" class="anime">
        <img :src="anime.image" class="anime-image"/>
        <div class="anime-details">
          <h3>{{ anime.title }}</h3>
          <span class="episodes">{{ anime.watched_episodes }} / {{ anime.total_episodes }} episodes</span>
          <span class="episode-name">{{ anime.episode_name }}</span>
          <div class="buttons">
            <button v-if="anime.watched_episodes > 0" @click="decreaseWatchedEpisodes(anime)" class="button">-</button>
            <button v-if="anime.total_episodes !== anime.watched_episodes" @click="increaseWatchedEpisodes(anime)" class="button">+</button>
            <button @click="removeAnimeFromWatchlist(anime)" class="button">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <div class="recommendations" v-if="limitedRecommendations.length > 0">
      <h2>Recommendations</h2>
      <div v-for="anime in limitedRecommendations" :key="anime.mal_id" class="recommendation">
        <img :src="anime.images.jpg.image_url" class="anime-image"/>
        <div class="anime-details">
          <h3>{{ anime.title }}</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">{{ anime.synopsis.slice(0, 120) }}...</p>
          <span class="flex-1"></span>
          <button @click="addAnimetoWatchlist(anime)" class="button">Add to Watchlist</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const query = ref('');
const my_watchlist = ref([]);
const search_results = ref([]);
const recommendations = ref([]);

const my_watchlist_asc = computed(() => {
  return my_watchlist.value.sort((a, b) => a.title.localeCompare(b.title));
});

const limitedRecommendations = computed(() => {
  const shuffled = recommendations.value.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
});

const searchAnime = () => {
  const url = `https://api.jikan.moe/v4/anime?q=${query.value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      search_results.value = data.data.map(anime => ({
        ...anime,
        streaming_platform: anime.streaming_info?.join(', ') || 'Not available'
      }));
    });
};

const handleInput = (e) => {
  if (!e.target.value) {
    search_results.value = [];
  }
};

const addAnimetoWatchlist = (anime) => {
  search_results.value = [];
  query.value = '';
  my_watchlist.value.push({
    id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.image_url,
    total_episodes: anime.episodes,
    watched_episodes: 0,
    episode_name: '',
    streaming_platform: anime.streaming_platform || 'Not available'
  });
  localStorage.setItem('my_watchlist', JSON.stringify(my_watchlist.value));
  fetchRecommendations();
};

const fetchEpisodeName = async (anime) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.id}/episodes`);
    const data = await response.json();
    const episode = data.data.find(ep => ep.mal_id === anime.watched_episodes);
    return episode ? episode.title : 'Episode name not found';
  } catch (error) {
    console.error('Error fetching episode name:', error);
    return 'Episode name not found';
  }
};

const updateEpisodeName = async (anime) => {
  anime.episode_name = await fetchEpisodeName(anime);
  localStorage.setItem('my_watchlist', JSON.stringify(my_watchlist.value));
};

const increaseWatchedEpisodes = async (anime) => {
  anime.watched_episodes++;
  await updateEpisodeName(anime);
  localStorage.setItem('my_watchlist', JSON.stringify(my_watchlist.value));
};

const decreaseWatchedEpisodes = async (anime) => {
  anime.watched_episodes--;
  await updateEpisodeName(anime);
  localStorage.setItem('my_watchlist', JSON.stringify(my_watchlist.value));
};

const fetchRecommendations = async () => {
  recommendations.value = [];
  for (const anime of my_watchlist.value) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.id}/recommendations`);
      const data = await response.json();
      const recommendedAnimes = data.data.map(rec => ({
        mal_id: rec.entry.mal_id,
        title: rec.entry.title,
        synopsis: rec.entry.synopsis,
        images: rec.entry.images
      }));
      recommendations.value.push(...recommendedAnimes);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }
};

onMounted(() => {
  my_watchlist.value = JSON.parse(localStorage.getItem('my_watchlist')) || [];
  my_watchlist.value.forEach(anime => {
    updateEpisodeName(anime);
  });
  fetchRecommendations();
});

const removeAnimeFromWatchlist = (animeToRemove) => {
  my_watchlist.value = my_watchlist.value.filter(anime => anime.id !== animeToRemove.id);
  localStorage.setItem('my_watchlist', JSON.stringify(my_watchlist.value));
  fetchRecommendations();
};
</script>

<style scoped>
.watchlist {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #24C484;
}

.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 1rem;
}

.search-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #24C484;
  color: white;
  cursor: pointer;
}

.results, .myanime, .recommendations {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.result, .anime, .recommendation {
  background: #1e1e1e;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  width: 80%;
  max-width: 600px;
}

.result:hover, .anime:hover, .recommendation:hover {
  transform: scale(1.03);
  transition: transform 0.3s;
}

.anime-image {
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-right: 1rem;
}

.anime-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #24C484;
}

.episodes, .episode-name {
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.button {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  background: #24C484;
  color: white;
  cursor: pointer;
}

p {
  font-size: 1.5rem;
  color: #cccccc;
  margin-bottom: 1rem;
}
</style>
