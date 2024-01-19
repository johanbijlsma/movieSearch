<script setup lang="ts">
	import MovieDetail from './../components/MovieDetail.vue';
</script>
<template>
	<div class="detail-view">
		<p>This is the Detail View</p>

		<router-link to="/"> Back to search </router-link>

		<MovieDetail />
	</div>
</template>
