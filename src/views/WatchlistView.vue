<template>
  <main class="watchlist">
    <h1>Watchlist</h1>

    <p>Willkommen auf Ihrer Anime-Watchlist-Seite! Hier können Sie Ihre eigene Watchlist erstellen und verwalten.</p>
    <p>Suchen Sie nach einem Anime und fügen Sie ihn zu Ihrer Watchlist hinzu. Sie können auch die Anzahl der Episoden, die Sie bereits gesehen haben, verwalten.</p>
    <p>Viel Spaß beim Entdecken und Verwalten Ihrer Anime-Welt!</p>

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
          <button @click="addAnimetoWatchlist(anime)" class="button">Add to My Anime</button>
        </div>
      </div>
    </div>

    <div class="myanime" v-if="my_watchlist.length > 0">
      <h2>My Anime</h2>
      <div v-for="anime in my_watchlist_asc" :key="anime.id" class="anime">
        <img :src="anime.image" class="anime-image"/>
        <div class="anime-details">
          <h3>{{ anime.title }}</h3>
          <span class="episodes">{{ anime.watched_episodes }} / {{ anime.total_episodes }} Episoden</span>
          <span class="episode-name">{{ anime.episode_name }}</span> <!-- Neue Zeile hinzufügen -->
          <div class="buttons">
            <button v-if="anime.watched_episodes > 0" @click="decreaseWatchedEpisodes(anime)" class="button">-</button>
            <button v-if="anime.total_episodes !== anime.watched_episodes" @click="increaseWatchedEpisodes(anime)" class="button">+</button>
            <button @click="removeAnimeFromWatchlist(anime)" class="button">Remove</button>
          </div>
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

const my_watchlist_asc = computed(() => {
  return my_watchlist.value.sort((a, b) => a.title.localeCompare(b.title));
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

onMounted(() => {
  my_watchlist.value = JSON.parse(localStorage.getItem('my_watchlist')) || [];
  my_watchlist.value.forEach(anime => {
    updateEpisodeName(anime);
  });
});

const removeAnimeFromWatchlist = (animeToRemove) => {
  my_watchlist.value = my_watchlist.value.filter(anime => anime.id !== animeToRemove.id);
  localStorage.setItem('my_watchlist', JSON.stringify(my_watchlist.value));
};
</script>

<style scoped>
.watchlist {
  text-align: center;
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
}

.search-input {
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

.anime-image {
  width: 80px;
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #24C484;
}

.episodes {
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 0.5rem;
}

.episode-name {
  font-size: 1rem;
  color: #cccccc;
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
}
</style>
