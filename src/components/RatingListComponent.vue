<template>
  <div>
    <div v-for="animeRating in animeRatings" :key="animeRating.animeTitle">
      <p>{{ animeRating.animeTitle }}</p>
      <p>{{ animeRating.rating }}</p>
      <p>{{ animeRating.experience }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      animeRatings: [],
    };
  },
  async created() {
    const response = await axios.get('https://otakurate-frontend.onrender.com/rate');
    this.animeRatings = response.data;
  },
};
</script>