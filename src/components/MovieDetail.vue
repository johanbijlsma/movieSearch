<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import axios from 'axios';
	import { useRoute } from 'vue-router';
	import { toNumber } from '@vue/shared';

	let queryLoading = ref(false);
	let loadingState = reactive([
		'loading',
		'loaded',
		'fetching',
		'fetched',
		'failed',
	]);
	let UIstate = ref('');
	let movieID: number;
	let results: Movie;
	const APIstringDetailStart = `https://api.themoviedb.org/3/movie/`;
	const APIstringDetailEnd = `?api_key=23c5356f958b1e94833e90b920184182`;

	type Movie = {
		title: string;
		poster_path: string;
		id: number;
		backdrop_path: string;
		budget: number;
		genres: [];
		homepage: string;
		imdb_id: string;
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		production_companies: [];
		release_date: string;
		revenue: number;
		runtime: number;
		status: string;
		tagline: string;
		video: false;
		vote_average: number;
		vote_count: number;
	};

	async function getDetails(this: any) {
		queryLoading.value = true;
		getMovieID();
		UIstate.value = loadingState[2];
		if (movieID !== undefined) {
			axios
				.get(APIstringDetailStart + movieID + APIstringDetailEnd)
				.then((res) => {
					results = res.data;

					UIstate.value = loadingState[3];
				})
				.catch((error: any) => ({ error, isLoading: false }));
		}
	}

	function getYear(a: string | any[]) {
		return a.slice(0, 4);
	}

	function getMovieID() {
		console.log(useRoute().params.id);
		movieID = toNumber(useRoute().params.id);
		console.log({ movieID });
	}
	function styleMoney(a: number) {
		return a.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	}

	getDetails();
</script>

<template>
	<section>
		<div
			v-if="UIstate == 'fetching' && results.id !== undefined"
			class="loading"
		>
			<div class="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>

		<div v-if="UIstate == 'fetched'" class="content-wrapper">
			<img
				v-if="results.poster_path != null"
				:src="`https://image.tmdb.org/t/p/w300/${results.poster_path}`"
				:alt="results.title"
				class="card-poster"
			/>
			<p class="intro">
				All the info about <span class="title">{{ results.title }}</span>
			</p>
			<p class="second-intro">
				{{ results.overview }}
			</p>

			<img
				v-if="results.backdrop_path != null"
				:src="`https://image.tmdb.org/t/p/w1400_and_h450_face${results.backdrop_path}`"
				:alt="results.title"
				class="card-backdrop"
			/>
			<ul class="column">
				<li>
					original title:
					<span class="detail">{{ results.original_title }}</span>
				</li>
				<li v-if="results.tagline">
					tagline: <span class="detail">{{ results.tagline }}</span>
				</li>
				<li>
					budget:
					<span class="detail">{{ styleMoney(results.budget) }}</span>
				</li>
				<li v-if="results.status != 'Released'">
					revenue:
					<span class="detail">{{ styleMoney(results.revenue) }}</span>
				</li>
				<li>
					homepage: <span class="detail">{{ results.homepage }}</span>
				</li>
				<li>
					imdb_id: <span class="detail">{{ results.imdb_id }}</span>
				</li>
				<li>
					original_language:
					<span class="detail">{{ results.original_language }}</span>
				</li>
				<li>Production Companies:</li>
				<div class="flex-container">
					<ul
						class="production_companies"
						v-for="{ index, name, logo_path } in results.production_companies"
						:key="index"
					>
						<li v-if="logo_path != null">
							<span class="hidden">{{ name }} </span>
							<img
								:src="`https://www.themoviedb.org/t/p/h30${logo_path}`"
								alt=""
							/>
						</li>
					</ul>
				</div>
				<li>
					popularity: <span class="detail">{{ results.popularity }}</span>
				</li>
				<li>
					release_date:
					<span class="detail">{{ results.release_date }}</span>
				</li>
				<li>
					vote_average:
					<span class="detail">{{ results.vote_average }}</span>
				</li>
				<li>
					vote_count: <span class="detail">{{ results.vote_count }}</span>
				</li>
				<li>Genres:</li>
				<ul
					class="movie-genres"
					v-for="{ index, name } in results.genres"
					:key="index"
				>
					<li>
						<span class="detail">{{ name }}</span>
					</li>
				</ul>
			</ul>
		</div>
	</section>
	<div class="dump">
		<details>
			<summary>Results</summary>
			{{ results }}
		</details>
	</div>
</template>

<style scoped>
	.flex-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.flex-container > ul {
		list-style: none;
		padding-inline-start: 0px;
		margin-block: 1.2rem;
	}

	.column {
		color: var(--color-text-darkbg);
	}

	span.detail {
		text-shadow: 0 0 var(--text-shadow);
		color: var(--primary);
	}
	span.hidden {
		display: none;
	}

	img.card-poster {
		@media screen and (min-width: 768px) {
			float: right;
			transform-origin: 50% 20%;
			transform: scale(0.75);
		}
		margin: 10px auto;
		display: block;
		border: 3px solid #fff;
		box-shadow: 0 0 5px #000;
		position: relative;
		z-index: 100;
	}
	span.title {
		color: var(--primary);
		font-weight: 700;
		@media (prefers-color-scheme: dark) {
			text-shadow: 0 0 5px 10px var(--secondary);
		}
	}
	section {
		position: relative;
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
	p.second-intro {
		grid-area: intro;
		font-size: 1.1rem;
		text-align: center;
		margin-block: 1.2rem;
		position: relative;
		z-index: 10;
		background-blend-mode: multiply;
		color: var(--color-text-darkbg);
		text-shadow: 0 0 var(--text-shadow);
		margin-inline: 5rem;
	}
	.suggestions {
		grid-area: sugestions;
		font-size: 1.6rem;
		text-align: center;
		margin-top: 1.2rem;
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
		width: 100%;
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
		font-size: clamp(1rem, 2.5vw, 2.7rem);
		line-height: 2.5rem;
		font-weight: 500;
		box-shadow: 0px 0px 60px 30px hsl(261 88% 26%);
		backdrop-filter: saturate(220%) blur(110px);
		margin-top: -50px;
		border-radius: 50%;
		padding: 14px;
		aspect-ratio: 1/1;
		width: 70px;
		height: 70px;
		text-align: center;
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

	img.card-backdrop {
		position: absolute;
		top: 0;
		object-fit: cover;
		filter: contrast(0.4) brightness(0.4);
		transition: all 100ms ease-in-out;
		transform: scale(1.5);
		height: 100%;
		width: 100%;
	}
	.card:hover img.card-backdrop {
		filter: contrast(0.4) brightness(0.5) opacity(0.7);
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
