<script setup lang="ts">
import type { Post } from '@/model/model';
import { ref } from 'vue';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
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

const loadThings = async (owner: string = '') => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const endpoint = baseUrl + '/rate' + '?owner=' + owner
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Post[] = response.data;
  responseData.forEach((post: Post) => {
    posts.value.push(post)
  });
}

loadThings();

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