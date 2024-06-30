<template>
  <div class="about">
    <h1>About OtakuRate</h1>
    <p>OtakuRate is a website that provides anime fans with a platform to rate their favorite animes and share their personal viewing experiences.</p>
    <p>Users can give their ratings on a scale of 1 to 100, allowing for precise and detailed assessments. These ratings are complemented by individual experience reports, where users can share their thoughts, feelings, and impressions about each anime with others.</p>
    <p>Anime enthusiasts can exchange views, discover new recommendations, and share their mutual enthusiasm for anime.</p>
    <div class="social-media">
      <h2>Follow MyAnimeList</h2>
      <button @click="navigateTo('https://www.instagram.com/myanimelistofficial/')" class="social-button instagram">Instagram</button>
      <button @click="navigateTo('https://twitter.com/myanimelist')" class="social-button twitter">Twitter</button>
    </div>
    <div class="testimonials">
      <h2>What Our Users Say</h2>
      <div class="testimonial">
        <p>"OtakuRate is my go-to site for anime reviews and recommendations. The community is fantastic!"</p>
        <span>- AnimeFan123</span>
      </div>
      <div class="testimonial">
        <p>"I love how detailed the rating system is. It really helps me find the best animes to watch."</p>
        <span>- MangaLover456</span>
      </div>
    </div>
    <div class="external-links">
      <h2>Learn More</h2>
      <a href="https://myanimelist.net" target="_blank" class="external-link">MyAnimeList</a>
      <a href="https://jikan.moe" target="_blank" class="external-link">Jikan API</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigateToRegister = () => {
  window.location.href = '/register';
};

const navigateTo = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.about {
  text-align: center;
  padding: 20px;
  background-color: #1e1e1e;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #24C484;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

p {
  font-size: 1.5rem;
  color: #dddddd;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.cta-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #24C484;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #1E9F75;
}

.about-image {
  margin-top: 20px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.social-media {
  margin-top: 30px;
}

.social-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;
  color: white;
}

.instagram {
  background-color: #E1306C;
}

.instagram:hover {
  background-color: #B9205C;
}

.twitter {
  background-color: #1DA1F2;
}

.twitter:hover {
  background-color: #0D95E8;
}

.testimonials {
  margin-top: 30px;
  text-align: left;
}

h2 {
  font-size: 2.5rem;
  color: #24C484;
  margin-bottom: 1rem;
}

.testimonial {
  background-color: #2a2a2a;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.testimonial p {
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 0.5rem;
}

.testimonial span {
  font-size: 1rem;
  color: #aaaaaa;
}

.external-links {
  margin-top: 30px;
}

.external-link {
  display: block;
  font-size: 1.5rem;
  color: #24C484;
  text-decoration: none;
  margin: 10px 0;
  transition: color 0.3s ease;
}

.external-link:hover {
  color: #1E9F75;
}
</style>
