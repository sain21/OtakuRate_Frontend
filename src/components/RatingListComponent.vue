<template>
  <div class="rating-list">
    <h3>{{ title }}</h3>
    <div class="search-section">
      <input v-model="animeSearchQuery" @input="searchAnime" placeholder="Search Anime" type="text" class="search-input">
      <div v-if="searchResults.length" class="search-results">
        <div v-for="anime in searchResults" :key="anime.mal_id" @click="selectAnime(anime)" class="search-result-item">
          <img :src="anime.images.jpg.image_url" :alt="anime.title" class="anime-thumbnail" />
          <p>{{ anime.title }}</p>
        </div>
      </div>
      <div v-else class="no-search-results">
        <p>No anime found</p>
      </div>
    </div>
    <div class="form-section">
      <input v-model="animeField" placeholder="Anime Name" type="text" class="form-input">
      <select v-model="ratingField" class="form-input">
        <option v-for="rating in ratings" :value="rating.value" :key="rating.value">{{ rating.text }}</option>
      </select>
      <textarea v-model="opinionField" placeholder="Your Opinion" class="form-input opinion-textarea"></textarea>
      <button @click="addNewPost" class="form-button">Save</button>
      <button v-if="isUpdating" @click="updatePost" class="form-button">Update</button>
    </div>
    <!-- Sorting controls right above the table -->
    <div class="sort-section">
      <select v-model="sortKey" class="sort-select">
        <option value="animeTitle">Anime Name</option>
        <option value="rating">Rating</option>
        <option value="createdAt">Date</option>
      </select>
      <select v-model="sortOrder" class="sort-select">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <div class="table-section">
      <table>
        <thead>
        <tr>
          <th>Image</th>
          <th>Anime</th>
          <th>Rating</th>
          <th>Opinion</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="sortedPosts.length === 0">
          <td colspan="5">No ratings yet</td>
        </tr>
        <tr v-for="animeRating in sortedPosts" :key="animeRating.id">
          <td><img :src="animeRating.image" :alt="animeRating.animeTitle" class="anime-image" /></td>
          <td>{{ animeRating.animeTitle }}</td>
          <td>{{ animeRating.rating }}</td>
          <td>{{ animeRating.experience }}</td>
          <td>
            <button @click="deleteEntry(animeRating.id)" class="action-button">Delete</button>
            <button @click="prepareUpdate(animeRating)" class="action-button">Update</button>
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
      title: 'Rating List',
      imageField: '',
      animeField: '',
      ratingField: '',
      opinionField: '',
      posts: [],
      animeSearchQuery: '',
      searchResults: [],
      sortKey: 'animeTitle',
      sortOrder: 'asc',
      isUpdating: false,
      updateId: null,
      ratings: [
        { value: 100, text: '(100) Masterpiece' },
        { value: 90, text: '(90) Great' },
        { value: 80, text: '(80) Very Good' },
        { value: 70, text: '(70) Good' },
        { value: 60, text: '(60) Fine' },
        { value: 50, text: '(50) Average' },
        { value: 40, text: '(40) Bad' },
        { value: 30, text: '(30) Very Bad' },
        { value: 20, text: '(20) Horrible' },
        { value: 10, text: '(10) Appalling' }
      ]
    };
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        let modifier = this.sortOrder === 'asc' ? 1 : -1;
        if (this.sortKey === 'createdAt') {
          let dateA = new Date(a[this.sortKey]);
          let dateB = new Date(b[this.sortKey]);
          return dateA < dateB ? -1 * modifier : dateA > dateB ? 1 * modifier : 0;
        } else {
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        }
      });
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
          console.error('Error fetching posts:', error);
        });
    },
    searchAnime() {
      if (!this.animeSearchQuery.trim()) {
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
          this.searchResults = [];
        });
    },
    selectAnime(anime) {
      this.animeField = anime.title;
      this.imageField = anime.images.jpg.image_url;
      this.animeSearchQuery = '';
      this.searchResults = [];
    },
    addNewPost() {
      if (this.ratingField > 100) {
        this.ratingField = 100;
        alert('Rating cannot be more than 100. It has been set to 100.');
      }
      const newEntry = {
        image: this.imageField,
        animeTitle: this.animeField,
        rating: parseFloat(this.ratingField),
        experience: this.opinionField,
      };
      axios.post(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate', newEntry)
        .then(response => {
          this.fetchPosts();
          this.clearForm();
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
    prepareUpdate(animeRating) {
      this.updateId = animeRating.id;
      this.imageField = animeRating.image;
      this.animeField = animeRating.animeTitle;
      this.ratingField = animeRating.rating;
      this.opinionField = animeRating.experience;
      this.isUpdating = true;
    },
    updatePost() {
      const updatedEntry = {
        image: this.imageField,
        animeTitle: this.animeField,
        rating: parseFloat(this.ratingField),
        experience: this.opinionField,
      };
      axios.put(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate/' + this.updateId, updatedEntry)
        .then(() => {
          this.fetchPosts();
          this.clearForm();
          this.isUpdating = false;
          this.updateId = null;
        })
        .catch(error => {
          console.error('Error updating entry:', error);
        });
    },
    clearForm() {
      this.imageField = '';
      this.animeField = '';
      this.ratingField = '';
      this.opinionField = '';
      this.isUpdating = false;
      this.updateId = null;
    }
  }
};
</script>
<style scoped>
.rating-list {
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.5rem;
  background-color: #1e1e1e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #24C484;
}

.search-section, .form-section, .table-section {
  margin-bottom: 1.5rem;
}

.search-input, .form-input {
  width: 100%;
  max-width: 600px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-input {
  resize: none;
}

.opinion-textarea {
  resize: none;
  height: 150px;
  width: 100%;
  max-width: 600px;
}

.form-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #24C484;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

.form-button:hover {
  background: #1E9F75;
}

.search-results {
  width: 100%;
  max-width: 600px;
  background: #1e1e1e;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.search-result-item:hover {
  background: #333;
}

.anime-thumbnail {
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
  border-radius: 4px;
}

.table-section {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid #ccc;
}

th {
  background: #333;
}

.anime-image {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
}

.action-button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  background: #007BFF;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

.action-button:hover {
  background: #0056b3;
}

.action-button:last-of-type {
  margin-right: 0;
}

.no-search-results {
  color: #888;
  margin-top: 0.5rem;
}

.sort-section {
  margin-bottom: 1rem;
  text-align: right;
}

.sort-select {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
