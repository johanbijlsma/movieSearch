<script setup lang="ts">
import { ref } from "vue";

let placeholder = ref("Type here to start searching...");
const suggestions = [
  "Star Wars",
  "Spiderman",
  "James Bond",
  "Spongebob Squarepants",
  "The Godfather",
  "The Shawshank Redemption",
  "The Matrix",
  "the Lego Movie",
];
let randomChosen: number;
let searchBar = ref("");
let queryLoading = ref(false);
let querySearchterm = ref("");

function randomlySuggest() {
  let items = suggestions.length || 0;
  let min = Math.floor(0);
  let max = Math.floor(items);
  let chosenItem = Math.floor(Math.random() * (max - min) + min);
  randomChosen = chosenItem;
}

function addSuggestion() {
  searchBar.value = suggestions[`${randomChosen}`];
  querySearchterm.value = searchBar.value;
  console.log({ placeholder, searchBar });
  randomlySuggest();
}

function search() {
  if (searchBar.value !== "") {
    querySearchterm.value = searchBar.value;
    queryLoading.value = true;
    // console.log();
  } else {
    querySearchterm.value = "";
    queryLoading.value = false;
    return;
  }
}

function updateSearch() {
  console.log("updateSearch ran");
  console.log({ searchBar });

  if (searchBar.value === "") {
    querySearchterm.value = "";
    queryLoading.value = false;
  }
}
function reset() {
  console.log("reset ran");
  console.log({ searchBar });
  searchBar.value = "";
  querySearchterm.value = "";
  queryLoading.value = false;
  console.log({ querySearchterm, queryLoading });
}

randomlySuggest();
</script>

<template>
  <section>
    <p class="intro">
      To start using this site, please enter a search query to look for Movie
      titles.
    </p>
    <div class="searchbar">
      <input
        type="search"
        name="movieSearch"
        id="movieSearch"
        :placeholder="placeholder"
        className="searchMovie"
        v-model="searchBar"
        :onBlur="updateSearch"
      />
      <button type="button" :onClick="search">Search</button>
    </div>
    <div v-if="queryLoading" class="suggestions">
      How about:
      <!-- <template v-for="(idea, index) in suggestions" :key="index">
            <span :class="`idea-${index}`">{{ idea }}</span>
        </template> -->
      <span class="suggestion" :onClick="addSuggestion"
        >"{{ suggestions[`${randomChosen}`] }}"</span
      >
    </div>
    <div v-if="(queryLoading = true)" class="loading">
      Loading... <button :onClick="reset">reset</button>
    </div>
    <details>
      <summary>randomChosen</summary>
      {{ randomChosen }}
    </details>
    <details>
      <summary>queryLoading</summary>
      {{ queryLoading }}
    </details>
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

section > input:focus {
  background: linear-gradient(45deg, var(--primary-20), var(--secondary-20));
}
.searchbar {
  grid-area: search;
  display: flex;
}
.searchbar input[type="search"] {
  margin: 1.4rem 2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: 0.3rem;
  border-radius: 10px;
  max-height: 2.4rem;
  box-shadow: 0px 0px 1px 3px var(--primary-20),
    0px 0px 1px 3px var(--primary-20), 0px 0px 1px 3px var(--primary-20);
  transition: box-shadow 200ms ease-in-out;
  flex-grow: 1;
}
input[type="search"]:focus,
input[type="search"]:focus-within,
input[type="search"]:focus-visible {
  box-shadow: 0px 0px 11px 8px var(--primary), 0px 0px 11px 8px var(--primary),
    0px 0px 11px 8px var(--primary);
  transition: all 200ms ease-in-out;
  margin: 1.4rem 5vw;
}

.searchbar button {
  margin: 1.4rem 2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: 0.2rem 1rem;
  border-radius: 10px;
  max-height: 2.4rem;
  /* box-shadow: 0px 0px 1px 3px var(--primary-20), */
  /* 0px 0px 1px 3px var(--primary-20), 0px 0px 1px 3px var(--primary-20); */
  transition: box-shadow 200ms ease-in-out;
  flex-grow: 0;
  background-color: var(--primary);
  color: white;
}

.searchbar button:hover,
.searchbar button:focus {
  transition: all 200ms ease-in-out;
  background-color: var(--secondary);
  cursor: pointer;
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

span.suggestion:hover,
span.suggestion:focus {
  display: inline-block;
  border: 1px dashed var(--primary);
  transform: rotate(3deg) translate(3px, 10px) scale(1.1);
  background-color: var(--primary);
  color: var(--secondary);
  cursor: pointer;
  transition: all 200ms ease-in;
}
</style>
