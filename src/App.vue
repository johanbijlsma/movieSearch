<script setup lang="ts"></script>

<template>
	<header>
		<router-link to="/"><h1>Johan's Movie search</h1></router-link>
		<p class="subheading">Powered by the The MovieDB</p>
		{{ $route.path }} - {{ $route.name }}
	</header>
	<main>
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<Component :is="Component" />
			</transition>
		</router-view>
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
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease-out;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
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
