<template>
  <div class="form">
    <input class="input" type="text" v-model="newPost.anime" placeholder="Suche" />
    <input class="input rating" type="number" v-model.number="newPost.rating" placeholder="Rating (0-100)" min="0" max="100" />
    <textarea class="input opinion" v-model="newPost.opinion" placeholder="Ihre Meinung..."></textarea>
    <button class="button" @click="addPost">{{ editIndex !== null ? 'Beitrag aktualisieren' : 'Post hinzufügen' }}</button>
  </div>

  <ReviewList :posts="posts" @delete-post="deletePost" />
</template>

<script>
export default {
  name: 'AnimeForum',
  data() {
    return {
      animeRatings: null, // Hier speichern wir die Daten aus der GET-Route
    }
  },
  created() {
    this.loadAnimeRatings();
  },
  methods: {
    loadAnimeRatings() {
      fetch('https://otakurate.onrender.com') // Ersetzen Sie dies durch Ihre GET-Route
        .then(response => response.json())
        .then(data => {
          this.animeRatings = data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}
</script>

<style scoped>
.form {
  position: sticky;
  top: 0;
  margin-bottom: 2rem;
  width: 120%;
  height: 120%;
  zoom: 1.2;
}
.input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 200%;
  height: 2.5rem;
  resize: none;
}
.input.rating {
  width: 120%;
  height: 2.5rem;
}

.input.opinion {
  width: 300%;
  height: 7rem;
}



.button {
  padding: 0.5rem 1rem;
  background-color: #d8b2d1;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 0.5rem 0;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button:hover {
  background-color: white;
  color: black;
}




</style>}