<script lang="ts">
	import Title from "../components/Title.svelte";
	import BottomNavigation from "../components/BottomNavigation.svelte";
</script>

<main>
	<Title />
	<BottomNavigation />
</main>

<style lang="scss">
	main {
		background: #000;
		height: 100vh;
		width: 100vw;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
