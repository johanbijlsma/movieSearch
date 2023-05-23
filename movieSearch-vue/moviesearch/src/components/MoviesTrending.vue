<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
let queryLoading = ref(false);
let loadingState = reactive([
  "loading",
  "loaded",
  "fetching",
  "fetched",
  "failed",
]);
let UIstate = ref("");

let trendNumber = 1;
let results = reactive([]);
const APIstringTrending =
  "https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=23c5356f958b1e94833e90b920184182";

function getTrending(this: any) {
  queryLoading.value = true;
  UIstate.value = loadingState[2];
  axios
    .get(APIstringTrending)
    .then((res) => {
      results = res.data.results;
      console.table(results);

      UIstate.value = loadingState[3];
      trendNumber = 1;
    })
    .catch((error: any) => ({ error, isLoading: false }));
}

function getYear(a: string | any[]) {
  return a.slice(0, 4);
}

getTrending();
</script>

<template>
  <section>
    <p class="intro">Here are the 20 most trending movies right now!</p>

    <div v-if="UIstate == 'fetching' && results.length == 0" class="loading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div
      v-if="UIstate == 'fetched' && results.length > 0"
      class="content-wrapper"
    >
      <div class="card-iterator">
        <div
          class="card card-trending"
          v-for="{ index, title, poster_path } in results"
          :key="index"
        >
          <img
            v-if="poster_path != null"
            :src="`https://image.tmdb.org/t/p/w300/${poster_path}`"
            :alt="title"
            class="card-poster"
          />
          <div class="title-container">
            <h3 class="card-title">
              <!-- {{ title }} -->
              {{ trendNumber++ }}
            </h3>
          </div>
          <!-- <img
          v-if="backdrop_path != null"
          :src="`https://image.tmdb.org/t/p/w1400_and_h450_face${backdrop_path}`"
          :alt="title"
          class="card-backdrop"
        /> -->
          <!-- <img
          v-if="backdrop_path == null"
          src="./../assets/fallback-background.jpg"
          alt=""
          class="card-backdrop fallback"
        /> -->
          <!-- <p> -->
          <!-- {{ overview }} -->
          <!-- </p> -->
        </div>
      </div>
    </div>
  </section>
  <div class="dump">
    <details>
      <summary>Results</summary>
      {{ results.findIndex((x: any) => x.title == "The Pope's Exorcist") }}
    </details>
  </div>
</template>

<style scoped>
section {
  /* display: grid;
  grid-template-areas: "intro intro intro" "search search search" "sugestions sugestions sugestions" "result result result";
  grid-template-columns: 1fr;
  @media max-width(768px) {
    grid-template-areas: "intro" "search" "sugestions" "result";
  }
  grid-template-rows: auto auto 1fr; */
  /* background: linear-gradient(
    45deg,
    var(--primary-20),
    var(--primary) 15%,
    var(--secondary),
    var(--secondary-20)
  ); */
  /* background: radial-gradient(
    ellipse at top left,
    var(--primary),
    var(--secondary-20),
    transparent
  ); */
  padding-block: 1rem;

  background-image: linear-gradient(
    360deg in oklch,
    hsl(160 100% 31%) 22% 22%,
    42%,
    hsl(261 88% 26%) 85% 85%
  );

  /* min-width: auto; */
  transition: background 200ms ease-in-out;
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
  margin: 1.4rem 2.5vw;
}

.searchbar button {
  margin: 1.4rem 2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: 0.2rem 1rem;
  border-radius: 16px;
  max-height: 2.4rem;
  transition: box-shadow 200ms ease-in-out;
  flex-grow: 0;
  background-color: var(--primary);
  color: white;
}

.searchbar button[type="reset"] {
  background-color: var(--secondary);
}
.searchbar button:hover,
.searchbar button:focus {
  transition: all 200ms ease-in-out;
  background-color: var(--secondary);
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
}
.searchbar button[type="reset"]:hover,
.searchbar button[type="reset"]:focus {
  background-color: var(--primary);
}

.searchbar button:disabled {
  background-color: var(--alert);
}
.searchbar button:disabled:hover {
  cursor: not-allowed;
}

p.intro {
  grid-area: intro;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 1.2rem;
  position: relative;
  z-index: 10;
  background-blend-mode: multiply;
  color: var(--color-text);
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
  max-width: 45%;
  padding: 2rem;
  border: 1px solid var(--primary);
  overflow: hidden;
  position: relative;
  background-color: var(--secondary);
}
.card p {
  color: var(--color-text-inverted);
}
.card-title {
  position: relative;
  z-index: 10;
  color: var(--primary);
  font-size: clamp(1rem, 2.5vw, 4rem);
  line-height: 2.5rem;
  font-weight: 500;
  box-shadow: 0px 0px 60px 30px hsl(261 88% 26%);
  backdrop-filter: saturate(220%) blur(110px);
  margin-top: -50px;
  border-radius: 50%;
  padding: 23px 37px 25px;
}

.card-title .release {
  font-size: 60%;
  color: var(--color-text-inverted);
}

.title-container {
  display: flex;
  justify-content: space-between;
}

.rating-container {
  font-size: 2rem;
  color: var(--color-text-inverted);
  position: relative;
  z-index: 10;
}
.rating-container span.rating {
  font-weight: bold;
}
.rating-container span.votes {
  font-style: italic;
  font-size: 60%;
  color: var(--color-text-inverted);
}

.card img.card-backdrop {
  position: absolute;
  top: 0;
  left: -50%;
  object-fit: cover;
  -webkit-filter: contrast(0.4) brightness(0.4);
  transition: all 100ms ease-in-out;
  transform: scale(1.5);
}
.card:hover img.card-backdrop {
  -webkit-filter: contrast(0.4) brightness(0.5) opacity(0.7);
  transform: scale(1.65);
  transition: all 200ms ease-in-out;
}

.card img.card-poster {
  border: 3px solid #fff;
  box-shadow: 0 0 5px #000;
  /* transform: scale(0.75); */
  transform-origin: 120% 0%;
}
/* styling for the debug pannel */

.dump {
  position: sticky;
  left: 0;
}

.loading {
  grid-area: sugestions;
  text-align: center;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .card {
    max-width: 100% !important;
    box-sizing: border-box;
    transform: scale(0.75);
  }

  section .searchbar {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  section .searchbar > * {
    flex-grow: 1;
  }
}
</style>
