<template>
  <div>
    <header>
      <h1>AnimeDatabase</h1>


    <form class="search-box" @submit.prevent="HandleSearch">
      <input
        type="search"
        class="search-field"
        placeholder="Search for anime..."
      required
      v-model="search_query"/>
    </form>
    </header>
    <main>
      <div class="cards" v-if="animelist.length > 0">
        <CardComponent
          v-for="anime in animelist"
          :key="anime.mal_id"
          :anime="anime"
        />
      </div>
  <div class="no-results" v-else>
    <h3>No results found</h3>
  </div>
  </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import CardComponent from '@/components/CardComponent.vue';

export default {
  components: {
    CardComponent,
  },
  setup() {
    const search_query = ref("");
    const animelist = ref([]);

    const HandleSearch = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search_query.value)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();


        const modifiedAnimeList = data.data.map(anime => ({
          ...anime,
          image_url: anime.images.jpg.large_image_url
        }));
        animelist.value = modifiedAnimeList;

      } catch (error) {
        console.error('Fehler beim Abrufen der Animes:', error);
      }
      search_query.value = "";
    }



    return {
      search_query,
      animelist,
      HandleSearch
    }
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: 'Fira Sans', sans-serif;
}
a{
  text-decoration: none;

}
header{
  padding-top: 50px;
  padding-bottom: 50px;
}
h1{
  color: #888;
  font-size: 42px;
  font-weight:400;
  text-align: center;
  text-transform: uppercase;
margin-bottom: 30px;
  strong{

    color: #313131;
  }
  &:hover{
    color: #313131;
  }
}
.search-box{
  display:flex;
  justify-content: center;
 padding-left: 30px;
  padding-right: 30px;

  .search-field{
    appearance: none;
    background: none;
    border: none;
    outline: none;

    background-color: #F3f3f3;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.15);

    display: block;
    width: 100%;
    margin-bottom: 600px;
    padding: 20px;
    border-radius: 8px;

    color: #313131;
    font-size: 20px;

  transition: 0.4s;

    &::placeholder{
      color: #AAA;
    }
    &:focus, &:valid{
      color: #FFF;
      background-color: #313131;
      box-shadow: 0px 0px 0px rgba(0,0,0,0.15);
    }


  }
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;

  .cards {
    display: flex;
    flex-wrap: wrap;
    margin: 0px -8px;

  }
}
</style>