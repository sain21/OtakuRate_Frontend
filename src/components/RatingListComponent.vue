<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="animeField" placeholder="Anime Name" type="text">
    <input v-model="ratingField" placeholder="Rating" type="number" @keyup.enter="addNewPost()">
    <input v-model="opinionField" placeholder="Your Opinion" type="text" @keyup.enter="addNewPost()">
    <button type="button" @click="addNewPost()">Save</button>
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
      <tr v-for="animeRating in posts" :key="animeRating.animeTitle">
        <td>{{animeRating.animeTitle}}</td>
        <td>{{animeRating.rating}}</td>
        <td>{{animeRating.experience}}</td>
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
  const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
  const endpoint = baseUrl + '/rate'
  const response: AxiosResponse = await axios.get(endpoint);
  console.log(response.data);
  const responseData: Post[] = response.data;
  responseData.forEach((post: Post) => {
    posts.value.push(post)
  })
}

const addNewPost = () => {
  let newPost: Post = { animeTitle: animeField.value, rating: ratingField.value, experience: opinionField.value };
  posts.value.push(newPost);
  animeField.value = '';
  ratingField.value = 0;
  opinionField.value = '';
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