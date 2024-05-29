<script setup lang="ts">
import { onMounted, ref, type Ref} from 'vue'
import axios from 'axios'

defineProps<{ title: string }>()

type Post = { anime: string, rating: number, opinion: string }

const posts: Ref<Post[]> = ref([])
const animeField = ref('')
const ratingField = ref(0)
const opinionField = ref('')

function createPost(): void{
  const post ={
    anime: animeField.value,
    rating: ratingField.value,
    opinion: opinionField.value
  }
  axios
    .post<Post>('{url}/rate)', post)
    .then((response) =>  posts.value.push(response.data))
    .catch((error) =>  console.error(error))

}
function requestPosts(): void{
  axios
    .get<Post[]>('{url}/rate')
    .then((response) => { posts.value = response.data })
    .catch((error) => console.log(error))
}
function removePost(post: Post): void{
  axios
    .delete('{url}/rate/${post.anime}')
    .then(() => { posts.value = posts.value.filter((p) => p.anime !== post.anime) })
    .catch((error) => console.log(error))
}

onMounted(() => requestPosts())


</script>

<template>
  <h3> {{ title }} </h3>
  <form @submit="createPost()" @submit.prevent>
    <input> type="text" v-model="animeField" placeholder="Anime Name">
    <input> type="number" v-model="ratingField" placeholder="Rating">
    <input> type="text" v-model="opinionField" placeholder="Your Opinion">
    <button type="submit">Save</button>

  </form>
  <hr/>
  <table>

    <tr>
      <th>Anime</th>
      <th>Rating</th>
      <th>Opinion</th>
    </tr>
    <tr v-if="!posts.length ">
      <td colspan="5">No ratings yet</td>
    </tr>
    <tr v-for="post in posts" :key="post.anime">

      <td>
        <button @click="removePost(post)" class="delete">Delete</button>
      </td>

      <td>{{ animeField }}</td>
      <td>{{ ratingField }}</td>
      <td>{{ opinionField }}</td>
    </tr>

  </table>

</template>





<style scoped>
form {
  display: flex;
  margin: 0 -16px;

  * {
    margin: 16px;
  }

  input {
    flex-grow: 1;
  }
}

table {
  margin: 8px -8px 0;

  th,
  td {
    padding: 8px;
  }
}

button {
  border-radius: 48px;
  padding: 8px;
  border: none;
  cursor: pointer;

  &.delete {
    background: darkred;
    color: white;
  }
}
</style>
