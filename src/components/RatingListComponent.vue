<script setup lang="ts">
import { defineProps } from 'vue'
import type { Post } from '@/model/model';

const props = defineProps({
  modelValue: Array as () => Post[]
})

</script>

<template>
  <div v-for="post in modelValue" :key="post.anime">
    <div>Anime: {{ post.anime }}</div>
    <div>Rating: {{ post.rating }}</div>
    <div>Opinion: {{ post.opinion }}</div>
  </div>
</template>

<style scoped>

</style>