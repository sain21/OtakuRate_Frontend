<script setup lang="ts">
import type { Post } from '@/model/model';
import { ref } from 'vue';
import axios from 'axios';
import RatingListComponent from '@/components/RatingListComponent.vue';

let posts = ref<Post[]>([]);
let newAnime = ref('');
let newRating = ref(0);
let newOpinion = ref('');

const addNewPost = () => {
  let newPost: Post = { anime: newAnime.value, rating: newRating.value, opinion: newOpinion.value };
  posts.value.push(newPost);
  newAnime.value = '';
  newRating.value = 0;
  newOpinion.value = '';
}

console.log("Backend URL: ", import.meta.env.VITE_BACKEND_URL);

axios.get(import.meta.env.VITE_BACKEND_URL + 'rate')
  .then(function (response) {
    // handle success
    console.log("Response data: ", response.data);
    posts.value = response.data;
  })
  .catch(function (error) {
    // handle error
    console.log("Error: ", error);
  })
  .finally(function () {
    // always executed
  });

</script>

<template>
  <h1>Anime Übersicht</h1>
  <RatingListComponent v-model="posts"></RatingListComponent>

  <div>
    <label>Anime Name</label>
    <input type="text" v-model="newAnime">
    <label>Anime Rating</label>
    <input type="number" v-model="newRating">
    <label>Your Opinion</label>
    <input type="text" v-model="newOpinion">
    <button @click="addNewPost">Hinzufügen</button>
  </div>

</template>

<style scoped>
h3 {
  margin-bottom: 30px;
}


h1 {
  width: 300%;
  margin: auto;
}


</style>