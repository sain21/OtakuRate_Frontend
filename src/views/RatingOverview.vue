<template>
  <div class="rate">

    <RatingListComponent />
  </div>
</template>

<script setup lang="ts">
import RatingListComponent from '@/components/RatingListComponent.vue';
</script>

<style scoped>
.rate {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #24C484;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
