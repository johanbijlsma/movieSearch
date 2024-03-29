<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import axios from 'axios';
	let placeholder = ref('Type here to start searching...');
	const suggestions = [
		'Star Wars',
		'Spiderman',
		'James Bond',
		'Spongebob Squarepants',
		'The Godfather',
		'The Shawshank Redemption',
		'The Matrix',
		'the Lego Movie',
	];
	let randomChosen: number;
	let searchBar = ref('');
	let queryLoading = ref(false);
	let loadingState = reactive([
		'loading',
		'loaded',
		'fetching',
		'fetched',
		'failed',
	]);
	let UIstate = ref('');
	let querySearchterm = ref('');
	let results = reactive([]);
	const APIstringMovie =
		'https://api.themoviedb.org/3/search/movie?api_key=23c5356f958b1e94833e90b920184182&query=';

	function randomlySuggest() {
		let items = suggestions.length || 0;
		let min = Math.floor(0);
		let max = Math.floor(items);
		let chosenItem = Math.floor(Math.random() * (max - min) + min);
		if (chosenItem === randomChosen) {
			console.log('randomly chose the same number');
			chosenItem = Math.floor(Math.random() * (max - min) + min);
		}
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
		if (searchBar.value !== '') {
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
			querySearchterm.value = '';
			queryLoading.value = false;
			UIstate.value = loadingState[4];

			return;
		}
	}

	function getYear(a: string | any[]) {
		return a.slice(0, 4);
	}

	function updateSearch() {
		console.log('updateSearch ran');
		console.log({ searchBar });

		if (searchBar.value === '') {
			querySearchterm.value = '';
			queryLoading.value = false;
			UIstate.value = loadingState[1];
		} else {
			search();
		}
	}
	function reset() {
		console.log('reset ran');
		console.log({ searchBar });
		searchBar.value = '';
		querySearchterm.value = '';
		queryLoading.value = false;
		UIstate.value = loadingState[1];
		results = [];
		console.log({ querySearchterm, queryLoading, UIstate });
	}
	function triggerFetching() {
		UIstate.value = loadingState[2];
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
				@keyup.enter="updateSearch"
				@onblur="updateSearch"
			/>

			<button
				type="reset"
				:onClick="reset"
				v-if="UIstate == 'fetched' && results.length > 0"
			>
				Start over
			</button>
		</div>

		<div v-if="UIstate == 'loaded'" class="suggestions">
			How about:
			<span class="suggestion" :onClick="addSuggestion"
				>"{{ suggestions[`${randomChosen}`] }}"</span
			>
		</div>
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
						id,
					} in results"
					:key="index"
				>
					<router-link :to="`/detail/${id}`">
						<div class="title-container">
							<h3 class="card-title">
								{{ title }}
								<span class="release" v-if="release_date != ''"
									>({{ getYear(release_date) }})</span
								>
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
						<img
							v-if="backdrop_path == null"
							src="./../assets/fallback-background.jpg"
							alt=""
							class="card-backdrop fallback"
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
					</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
	section {
		padding-block: 1rem;
		background-image: radial-gradient(
			farthest-corner ellipse at 1% 3% in oklch,
			hsl(160 100% 37%) 22% 22%,
			42%,
			hsl(261 88% 48%) 57% 57%
		);
	}
	section > input:focus {
		background-image: radial-gradient(
			farthest-corner ellipse at 1% 3% in oklch,
			hsl(160 100% 37%) 22% 22%,
			42%,
			hsl(261 88% 48%) 57% 57%
		);
	}
	.searchbar {
		grid-area: search;
		display: flex;
	}
	.searchbar input[type='search'] {
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
	input[type='search']:focus,
	input[type='search']:focus-within,
	input[type='search']:focus-visible {
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

	.searchbar button[type='reset'] {
		background-color: var(--secondary);
	}
	.searchbar button:hover,
	.searchbar button:focus {
		transition: all 200ms ease-in-out;
		background-color: var(--secondary);
		cursor: pointer;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
	}
	.searchbar button[type='reset']:hover,
	.searchbar button[type='reset']:focus {
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
		color: var(--color-text-darkbg);
		text-shadow: 0 0 var(--text-shadow);
	}
	.suggestions {
		grid-area: sugestions;
		font-size: 1.6rem;
		text-align: center;
		margin-top: 1.2rem;
		color: var(--color-text-darkbg);
		text-shadow: 0 0 var(--text-shadow);
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
	.card p {
		color: var(--color-text-inverted);
	}
	.card-title {
		position: relative;
		z-index: 10;
		color: var(--primary);
		font-size: clamp(1rem, 2.5vw, 2rem);
		line-height: 1.1;
		font-weight: 500;
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
		filter: contrast(0.4) brightness(0.4);
		transition: all 100ms ease-in-out;
		transform: scale(1.5);
	}
	.card:hover img.card-backdrop {
		filter: contrast(0.4) brightness(0.5) opacity(0.7);
		transform: scale(1.65);
		transition: all 200ms ease-in-out;
	}

	.card img.card-poster {
		float: right;
		border: 3px solid #fff;
		box-shadow: 0 0 5px #000;
		transform: scale(0.75);
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
			width: 100% !important;
			box-sizing: border-box;
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
