<template>
  <div>
    <h3>{{ title }}</h3>
    <div>
      <input v-model="animeSearchQuery" @input="searchAnime" placeholder="Search Anime" type="text">
      <div v-if="searchResults.length">
        <div v-for="anime in searchResults" :key="anime.mal_id" @click="selectAnime(anime)">
          <img :src="anime.images.jpg.image_url" alt="anime.title" />
          <p>{{ anime.title }}</p>
        </div>
      </div>
    </div>
    <div>
      <input v-model="animeField" placeholder="Anime Name" type="text">
      <input v-model="ratingField" placeholder="Rating" type="number">
      <input v-model="opinionField" placeholder="Your Opinion" type="text">
      <button @click="addNewPost">Save</button>
    </div>
    <div>
      <table>
        <thead>
        <tr>
          <th>Anime</th>
          <th>Rating</th>
          <th>Opinion</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="posts.length === 0">
          <td colspan="5">No ratings yet</td>
        </tr>
        <tr v-for="animeRating in posts" :key="animeRating.id">
          <td>{{ animeRating.animeTitle }}</td>
          <td>{{ animeRating.rating }}</td>
          <td>{{ animeRating.experience }}</td>
          <td><img :src="animeRating.image" alt="animeRating.animeTitle" class="anime-image" /></td>
          <td>
            <button @click="deleteEntry(animeRating.id)">Löschen</button>
            <button @click="updateEntry(animeRating.id)">Update</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RatingListComponent',
  data() {
    return {
      title: 'Anime Rating List',
      animeField: '',
      ratingField: '',
      opinionField: '',
      posts: [],
      animeSearchQuery: '',
      searchResults: []
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios.get(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate')
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchAnime() {
      if (this.animeSearchQuery.trim() === '') {
        this.searchResults = [];
        return;
      }
      const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(this.animeSearchQuery)}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.searchResults = data.data;
        })
        .catch(error => {
          console.error('Error fetching anime:', error);
        });
    },
    selectAnime(anime) {
      this.animeField = anime.title;
      this.imageField = anime.images.jpg.image_url;
      this.animeSearchQuery = '';
      this.searchResults = [];
    },
    addNewPost() {
      const newEntry = {
        animeTitle: this.animeField,
        rating: parseFloat(this.ratingField),
        experience: this.opinionField,
        image: this.imageField
      };
      axios.post(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate', newEntry)
        .then(response => {
          this.animeField = '';
          this.ratingField = '';
          this.opinionField = '';
          this.imageField = '';
          this.fetchPosts();
        })
        .catch(error => {
          console.error('Error adding entry:', error);
        });
    },
    deleteEntry(entryId) {
      axios.delete(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate/' + entryId)
        .then(() => {
          this.fetchPosts();
        })
        .catch(error => {
          console.error('Error deleting entry:', error);
        });
    },
    updateEntry(entryId) {
      const updatedEntry = {
        animeTitle: this.animeField,
        rating: parseFloat(this.ratingField),
        experience: this.opinionField,
        image: this.imageField
      };
      axios.put(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate/' + entryId, updatedEntry)
        .then(() => {
          this.animeField = '';
          this.ratingField = '';
          this.opinionField = '';
          this.imageField = '';
          this.fetchPosts();
        })
        .catch(error => {
          console.error('Error updating entry:', error);
        });
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}

table {
  margin-left: auto;
  margin-right: auto;
}

button {
  color: blue;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

li:hover {
  background: #f0f0f0;
}

.anime-image {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 1rem;
}
</style>
