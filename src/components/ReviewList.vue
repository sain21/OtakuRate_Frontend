<template>
  <div class="posts">
    <h2>Beiträge:</h2>
    <ul>
      <li class="post" v-for="(post, index) in posts" :key="index">
        <h3>Anime: {{ post.anime }}</h3>
        <p>Rating: {{ post.rating }}</p>
        <div class="opinion-section">
          <span>Meinung:</span>
          <p>{{ post.opinion }}</p>
        </div>
        <button class="delete-button" @click="deletePost(index)">Löschen</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['posts'],
  methods: {
    deletePost(index) {
      this.$emit('delete-post', index);
    }
  }
};
</script>
<style scoped>
.posts {
  margin-left: 700px; /* Erhöhen Sie diesen Wert, um die Beiträge weiter rechts zu positionieren */
  width: 800%;
  height: auto;
  max-height: 500px;
  overflow-y: auto;
  font-size: 20px; /* Erhöhen Sie diesen Wert, um die Größe der Beiträge zu erhöhen */
  margin-top: -65px;

  .opinion-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
}
</style>