<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
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
let loadingState = reactive([
  "loading",
  "loaded",
  "fetching",
  "fetched",
  "failed",
]);
let UIstate = ref("");
let querySearchterm = ref("");
let results = reactive([]);
const APIstringMovie =
  "https://api.themoviedb.org/3/search/movie?api_key=23c5356f958b1e94833e90b920184182&query=";

function randomlySuggest() {
  let items = suggestions.length || 0;
  let min = Math.floor(0);
  let max = Math.floor(items);
  let chosenItem = Math.floor(Math.random() * (max - min) + min);
  randomChosen = chosenItem;
  UIstate = ref(loadingState[1]);
}

function addSuggestion() {
  searchBar.value = suggestions[`${randomChosen}`];
  querySearchterm.value = searchBar.value;
  console.log({ placeholder, searchBar });
  randomlySuggest();
}

function search(this: any) {
  if (searchBar.value !== "") {
    querySearchterm.value = searchBar.value;
    queryLoading.value = true;
    UIstate.value = loadingState[2];
    axios
      .get(APIstringMovie + querySearchterm.value)
      .then((res) => {
        results = res.data.results;
        console.table(results);
        UIstate.value = loadingState[3];
      })
      .catch((error: any) => ({ error, isLoading: false }));
  } else {
    querySearchterm.value = "";
    queryLoading.value = false;
    UIstate.value = loadingState[4];

    return;
  }
}

function getYear(a) {
  return a.slice(0, 4);
}

function updateSearch() {
  console.log("updateSearch ran");
  console.log({ searchBar });

  if (searchBar.value === "") {
    querySearchterm.value = "";
    queryLoading.value = false;
    UIstate.value = loadingState[1];
  } else {
    search();
  }
}
function reset() {
  console.log("reset ran");
  console.log({ searchBar });
  searchBar.value = "";
  querySearchterm.value = "";
  queryLoading.value = false;
  UIstate.value = loadingState[1];
  results = [];
  console.log({ querySearchterm, queryLoading, UIstate });
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
        @keyup.enter="updateSearch"
      />

      <button
        type="button"
        :onClick="reset"
        v-if="UIstate == 'fetched' && results.length > 0"
      >
        Start over
      </button>
      <button type="button" :onClick="search">Search</button>
    </div>

    <div v-if="UIstate == 'loaded'" class="suggestions">
      How about:
      <!-- <template v-for="(idea, index) in suggestions" :key="index">
            <span :class="`idea-${index}`">{{ idea }}</span>
        </template> -->
      <span class="suggestion" :onClick="addSuggestion"
        >"{{ suggestions[`${randomChosen}`] }}"</span
      >
    </div>
    <div v-if="UIstate == 'fetching' && results.length == 0" class="loading">
      Loading...
    </div>
    <div
      v-if="UIstate == 'fetched' && results.length > 0"
      class="content-wrapper"
    >
      <div class="card-iterator">
        <div
          class="card"
          v-for="{
            index,
            title,
            backdrop_path,
            overview,
            poster_path,
            vote_average,
            vote_count,
            release_date,
          } in results"
          :key="index"
        >
          <div class="title-container">
            <h3 class="card-title">
              {{ title }}
              <span class="release">({{ getYear(release_date) }})</span>
            </h3>
            <div class="rating-container" v-if="vote_average != 0">
              <span class="rating"
                >{{ Math.round(vote_average * 10) / 10 }}
              </span>
              <span class="votes">/{{ vote_count }}</span>
            </div>
          </div>
          <img
            v-if="backdrop_path != null"
            :src="`https://image.tmdb.org/t/p/w1400_and_h450_face${backdrop_path}`"
            :alt="title"
            class="card-backdrop"
          />
          <p>
            <img
              v-if="poster_path != null"
              :src="`https://image.tmdb.org/t/p/w185/${poster_path}`"
              :alt="title"
              class="card-poster"
            />
            {{ overview }}
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="dump">
    <div v-if="UIstate == 'loading'">⌛️ loading</div>
    <div v-if="UIstate == 'loaded'">✅ loaded</div>
    <div v-if="UIstate == 'fetching'">🚀 fetching</div>
    <div v-if="UIstate == 'fetched'">🏁 fetched</div>
    <div v-if="UIstate == 'failed'">❌ failed</div>
    <button :onClick="reset">reset</button>
    <details>
      <summary>randomChosen</summary>
      {{ randomChosen }}
    </details>
    <details>
      <summary>queryLoading</summary>
      {{ queryLoading }}
    </details>
    <details>
      <summary>querySearchterm</summary>
      {{ querySearchterm }}
    </details>
    <details>
      <summary>Results</summary>
      {{ results }}
    </details>
  </div>
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
  min-width: auto;
  transition: all 200ms ease-in-out;
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

.content-wrapper {
  /* width: 100%; */
  overflow: hidden;
  grid-area: result;
  margin-bottom: 2rem;
}

.card-iterator {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  flex-direction: row;
}

.card {
  width: 45%;

  padding: 2rem;
  border: 1px solid var(--primary);
  overflow: hidden;
  position: relative;
  background-color: var(--secondary);
}

.card-title {
  position: relative;
  z-index: 10;
  color: var(--primary);
  font-size: clamp(1rem, 2.5vw, 2rem);
}

.card-title .release {
  font-size: 60%;
  color: var(--color-text);
}

.title-container {
  display: flex;
  justify-content: space-between;
}

.rating-container {
  font-size: 2rem;
  color: var(--white);
  position: relative;
  z-index: 10;
}
.rating-container span.rating {
  font-weight: bold;
}
.rating-container span.votes {
  font-style: italic;
  font-size: 60%;
  color: var(--color-text);
}

.card img.card-backdrop {
  position: absolute;
  top: 0;
  left: -50%;
  object-fit: cover;
  -webkit-filter: contrast(0.4) brightness(0.4);
  transition: all 100ms ease-in-out;
}
.card:hover img.card-backdrop {
  -webkit-filter: contrast(0.4) brightness(0.5) opacity(0.7);
  transform: scale(1.4);
  transition: all 200ms ease-in-out;
}

.card img.card-poster {
  float: right;
  border: 3px solid #fff;
  box-shadow: 0 0 5px #000;
  /* margin: -2px 10px 10px 10px; */
  transform: scale(0.75);
  transform-origin: 120% 0%;
}
/* styling for the debug pannel */

.dump {
  position: sticky;
  left: 0;
}
</style>
