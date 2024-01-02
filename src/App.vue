<script setup lang="ts">
	import MoviesTrending from './components/MoviesTrending.vue';
	import MovieSearch from './components/MovieSearch.vue';
</script>

<template>
	<header>
		<router-link :to="{ name: 'home' }"
			><h1>Johan's Movie search</h1></router-link
		>
		<p class="subheading">Powered by the The MovieDB</p>
	</header>
	<main>
		<template v-if="$route.name === 'home'"
			><MovieSearch /> <MoviesTrending />
		</template>
		<template v-if="$route.name === 'detail'"><router-view /> ></template>
	</main>
</template>

<style>
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
		}
		.wrapper {
			display: flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}
	}
</style>
