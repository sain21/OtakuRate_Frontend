<script setup lang="ts">
import AnimeForum from '@/components/AnimeForum.vue'
</script>

<template>
  <main>
    <h1>Willkommen im Forum</h1>
    <p></p>
    <p></p>
    <p></p>
    <h3>Gib deine Bewertung zu einem Anime ab:</h3>
    <div class="content">
      <AnimeForum />
    </div>
  </main>
</template>

<style scoped>
h3 {
  margin-bottom: 30px;
}


h1 {
  width: 300%;
  margin: auto;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>