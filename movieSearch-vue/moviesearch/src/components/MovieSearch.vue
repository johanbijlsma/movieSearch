<script setup lang="ts">
const placeholder = "Type here to start searching...";
const suggestions = [
  "Star Wars",
  "Spiderman",
  "James Bond",
  "Spongebob Squarepants",
  "The Godfather",
];

function randomlySuggest() {
  let items = suggestions.length || 0;
  let min = Math.floor(0);
  let max = Math.floor(items);
  console.log(randomlySuggest);
  return Math.random() * (max - min) + min;
}

randomlySuggest();
</script>

<template>
  <section>
    <p class="intro">
      To start using this site, please enter a search query to look for Movie
      titles.
    </p>
    <input
      type="search"
      name="movieSearch"
      id="movieSearch"
      :placeholder="placeholder"
      className="searchMovie"
    />
    <div class="suggestions">
      How about:
      <template v-for="(idea, index) in suggestions" :key="index">
        <span :class="`idea-${index}`">{{ idea }}</span>
      </template>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-areas: "intro intro intro" "search search search" "sugestions sugestions sugestions" "result result result";
  grid-template-rows: auto 100px 100px 1fr;
  background: linear-gradient(
    45deg,
    var(--primary-20),
    var(--primary) 15%,
    var(--secondary),
    var(--secondary-20)
  );
  min-height: 80vh;
  min-width: 80vw;
  transition: box-shadow 200ms ease-in-out;
}

section:focus-within {
  background: linear-gradient(45deg, var(--primary-20), var(--secondary-20));
}
input[type="search"] {
  margin: 1.4rem 2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: 0.3rem;
  border-radius: 10px;
  max-height: 2.4rem;
  box-shadow: 0px 0px 1px 3px var(--primary-20),
    0px 0px 1px 3px var(--primary-20), 0px 0px 1px 3px var(--primary-20);
  transition: box-shadow 200ms ease-in-out;
  grid-area: search;
}
input[type="search"]:focus,
input[type="search"]:focus-within,
input[type="search"]:focus-visible {
  box-shadow: 0px 0px 11px 8px var(--primary), 0px 0px 11px 8px var(--primary),
    0px 0px 11px 8px var(--primary);
  transition: all 200ms ease-in-out;
  margin: 1.4rem 5vw;
}

p.intro {
  grid-area: intro;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 1.2rem;
  position: relative;
  z-index: 10;
  background-blend-mode: multiply;
  text-shadow: 0 0 white;
}
.suggestions {
  grid-area: sugestions;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 1.2rem;
  text-shadow: 0 0 white;
}
</style>
