<<template>
  <div class="container">

    <div class="form">
      <input class="input" type="text" v-model="newPost.anime" placeholder="Suche" />
      <input class="input" type="number" v-model.number="newPost.rating" placeholder="Rating (0-100)" />
      <textarea class="input" v-model="newPost.opinion" placeholder="Ihre Meinung..."></textarea>
      <button class="button" @click="addPost">{{ editIndex !== null ? 'Beitrag aktualisieren' : 'Post hinzufügen' }}</button>
    </div>

    <div class="posts">
      <h2>Beiträge:</h2>
      <ul>
        <li class="post" v-for="(post, index) in posts" :key="index">
          <h3>{{ post.anime }}</h3>
          <p>Rating: {{ post.rating }}</p>
          <p>Meinung: {{ post.opinion }}</p>
          <button class="delete-button" @click="deletePost(index)">Löschen</button>
          <button class="edit-button" @click="editPost(index)">Bearbeiten</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editIndex: null,
      newPost: {
        anime: "",
        rating: null,
        opinion: ""
      },
      posts: []
    };
  },
  methods: {
    addPost() {
      if (this.newPost.anime && this.newPost.rating !== null && this.newPost.opinion) {
        if (this.editIndex !== null) {
          this.posts.splice(this.editIndex, 1, { ...this.newPost });
          this.editIndex = null;
        } else {
          this.posts.push({ ...this.newPost });
        }
        this.newPost = { anime: "", rating: null, opinion: "" };
      }
    },
    deletePost(index) {
      this.posts.splice(index, 1);
    },
    editPost(index) {
      this.newPost = { ...this.posts[index] };
      this.editIndex = index;
    }
  }
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

.form {
  position: sticky;
  top: 0;
  margin-bottom: 2rem;
}
.input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  height: 2.5rem;
  resize: none;
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

.posts {
  width: 100%;
  max-width: 600px;
}

.post {
  padding: 1rem;
  margin-bottom: 1rem;
}

.delete-button {
  background-color: #f44336; /* Red */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
}

.delete-button:hover {
  background-color: white;
  color: black;
  .edit-button {
    background-color: #4CAF50; /* Green */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin: 0.5rem 0;
    cursor: pointer;
  }

  .edit-button:hover {
    background-color: white;
    color: black;
  }

.posts {
  width: 100%;
  max-width: 600px;
  height: 500px; /* Passen Sie diese Höhe an Ihre Bedürfnisse an */
  overflow-y: auto; /* Fügt eine vertikale Scrollbar hinzu, wenn der Inhalt die Höhe überschreitet */
  display: flex;
  flex-direction: column-reverse; /* Stapelt die Beiträge von unten nach oben */
}

}
</style>}