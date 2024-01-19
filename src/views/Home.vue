<script setup lang="ts">
	import MovieSearchVue from './../components/MovieSearch.vue';
	import MoviesTrendingVue from './../components/MoviesTrending.vue';
	import MovieDetail from './../components/MoviesTrending.vue';
</script>
<template>
	<div class="home-view">
		<p>This is the Home View</p>
		<MovieSearchVue />
		<MoviesTrendingVue />
		<MovieDetail />
	</div>
</template>

<style scoped></style>
