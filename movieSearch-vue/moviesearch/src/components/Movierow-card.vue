<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ overview }}</p>
    {{ title }} {{ overview }}
  </div>
</template>

<script setup lang="ts">
// let poster: string;
// let poster_path: string;
// let backdrop: string;
// let backdrop_path: string;
// let movie = movie;
// let key = movie.id;
// let backdrop = movie.backdrop;
let title: any;
let overview: any;
console.log("MovieRow-Card.vue loaded");
</script>

<style scoped></style>
