<script setup lang="ts">
import MovieSearchVue from "./components/MovieSearch.vue";
</script>

<template>
  <header>
    <h1>Johan's Movie search</h1>
    <p class="subheading">Powered by the The MovieDB</p>
  </header>
  <main>
    <!-- <div class="wrapper"></div> -->

    <MovieSearchVue />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    min-height: 80px;
    /* place-items: center;
    padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }
  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
