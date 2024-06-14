<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="animeField" placeholder="Anime Name" type="text">
    <input v-model="ratingField" placeholder="Rating" type="number" >
    <input v-model="opinionField" placeholder="Your Opinion" type="text" >
    <button @click="addNewPost">Save</button>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>Anime</th>
        <th>Rating</th>
        <th>Opinion</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="posts.length === 0">
        <td colspan="3">No ratings yet</td>
      </tr>
      <tr v-for="animeRating in posts" :key="animeRating.id">
        <td>{{animeRating.animeTitle}}</td>
        <td>{{animeRating.rating}}</td>
        <td>{{animeRating.experience}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'RatingListComponent',
  data() {
    return {
      animeField: '',
      ratingField: '',
      opinionField: '',
      posts: []
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios.get(import.meta.env.VITE_BACKEND_URL + '/rate')
        .then(function (response) {
          this.posts= response.data;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },


    addNewPost() {
      const newEntry = {
animeTitle: this.animeField,
rating: parseFloat(this.ratingField),
experience: this.opinionField
      };
      axios.post(import.meta.env.VITE_BACKEND_URL + '/rate', newEntry)
        .then(response => {
          this.animeField = '';
          this.ratingField = '';
          this.opinionField = '';
          this.fetchEntries();
        })
        .catch(error => {
          console.error('Error adding entry:', error);
        });



    },
    deleteEntry(entryId) {
      axios.delete(import.meta.env.VITE_BACKEND_URL + '/entries/' + entryId)
        .then(() => {
          this.fetchEntries();
        })
        .catch(error => {
          console.error('Error deleting entry:', error);
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
</style>