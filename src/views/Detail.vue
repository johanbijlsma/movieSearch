<script setup lang="ts">
	import MovieDetail from './../components/MovieDetail.vue';
</script>
<template>
	<router-link to="/"> Back to search </router-link>
	<Transition name="slide-fade">
		<MovieDetail />
	</Transition>
</template>

<style>
	/*
  Enter and leave animations can use different
  durations and timing functions.
*/
	.slide-fade-enter-active {
		transition: all 0.3s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}
</style>
