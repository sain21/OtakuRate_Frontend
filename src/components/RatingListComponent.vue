<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="animeField" placeholder="Anime Name" type="text">
    <input v-model="ratingField" placeholder="Rating" type="number" @keyup.enter="save()">
    <input v-model="opinionField" placeholder="Your Opinion" type="text" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <div>
    <table>
      <thead>
      <tr v-for="post in posts" :key="post.anime">
        <td>{{post.anime}}</td>
        <td>{{post.rating}}</td>
        <td>{{post.opinion}}</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="posts.length === 0">
        <td colspan="3">No ratings yet</td>
      </tr>
      <tr v-for="post in posts" :key="post.anime">
        <td>{{post.anime}}</td>
        <td>{{post.rating}}</td>
        <td>{{post.opinion}}</td>
      </tr>
      <tr>
        <td>{{ animeField }}</td>
        <td>{{ ratingField }}</td>
        <td>{{ opinionField }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup lang="ts">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Post} from '@/model/model';
import type {Ref} from 'vue'



defineProps<{
  title: string
}>()
const posts: Ref<Post[]> = ref([])
const animeField = ref('')
const ratingField = ref(0)
const opinionField = ref('')

onMounted(async () => {
  await loadThings()
})


async function loadThings (owner: string = '') {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/rate' + '?owner=' + owner
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Post[] = response.data;
  responseData.forEach((post: Post) => {
    posts.value.push(post)
  })
}

async function save () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/rate'
  const data: Post = {
    anime: animeField.value,
    rating: ratingField.value,
    opinion: opinionField.value,
  }
  try {
    const response: AxiosResponse = await axios.post(endpoint, data);
    const responseData: Post = response.data;
    console.log('Success:', responseData)

    posts.value.push(responseData)
  } catch (error) {
    console.error('Error saving post:', error)
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