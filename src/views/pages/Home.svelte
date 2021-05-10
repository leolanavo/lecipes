<script lang="ts">
	import Title from "../components/Title.svelte";
</script>

<main>
	<Title name="Katie" />
</main>

<style lang="scss">
	main {
		background: #000;
		height: 100vh;
		width: 100vw;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
