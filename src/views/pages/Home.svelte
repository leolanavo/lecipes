<script lang="ts">
	import Title from "../components/Title.svelte";
	import BottomNavigation from "../components/BottomNavigation.svelte";
	import FilterPills from "../components/FilterPills.svelte";
	import RecipeList from "../components/RecipeList.svelte";
	import Hydrate from "../components/Hydrate.svelte";

	export let recipes;
</script>

<main>
	<Title />
	<Hydrate
		name="FilterPills"
		component={FilterPills}
		props={{ recipes }}
	/>
	<RecipeList {recipes} />
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