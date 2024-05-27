<script setup lang="ts">
import { defineProps } from 'vue'
import type { Post } from '@/model/model';
import { ref } from 'vue';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

let posts = ref<Post[]>([]);
let newAnime = ref('');
let newRating = ref(0);
let newOpinion = ref('');

const addNewPost = async () => {
  let newPost: Post = { anime: newAnime.value, rating: newRating.value, opinion: newOpinion.value };
  posts.value.push(newPost);
  newAnime.value = '';
  newRating.value = 0;
  newOpinion.value = '';
  // Send the new post to the server
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const endpoint = baseURL + '/posts';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  };
  const response = await fetch(endpoint, requestOptions);
  if (!response.ok) {
    console.error('Failed to save the new post to the server');
  }
}

const props = defineProps({
  modelValue: Array as () => Post[]
})

const loadThings = async (owner: string = '') => {
  const baseURL = import.meta.env.VITE_BACKEND_URL
  const endpoint = baseURL + '/posts';

  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  }
  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then((result: Post[]) => result.forEach(post => {
      posts.value.push(post)
    }))
    .catch(error => console.log('error', error));
}

loadThings();

</script>

<template>
  <div v-for="post in modelValue" :key="post.anime">
    <div>Anime: {{ post.anime }}</div>
    <div>Rating: {{ post.rating }}</div>
    <div>Opinion: {{ post.opinion }}</div>
  </div>
  <h1>Anime Übersicht</h1>

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

</style>