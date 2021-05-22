<script lang="ts">
	import Favorites from 'svelte-material-icons/Heart.svelte';
	import Home from 'svelte-material-icons/HomeVariant.svelte';
	import Search from 'svelte-material-icons/Magnify.svelte';

	const iconSize = '1.5rem';
	const selectedNavEntry = 'Home';
</script>

<nav class="bottom-navigation">
	<ul>
		<li>
			<a
				href=""
				class="nav-entry"
				class:nav-entry-focused={selectedNavEntry === 'Home'}
			>
				<Home size={iconSize} />
				<span>Home</span>
			</a>
		</li>
		<li>
			<a
				href=""
				class="nav-entry"
				class:nav-entry-focused={selectedNavEntry === 'Search'}
			>
				<Search size={iconSize} />
				<span>Search</span>
			</a>
		</li>
		<li>
			<a
				href=""
				class="nav-entry"
				class:nav-entry-focused={selectedNavEntry === 'Favorites'}
			>
				<Favorites size={iconSize} />
				<span>Favorites</span>
			</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	.bottom-navigation {
		background-color: #430049;
		bottom: 0;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		position: fixed;
		width: 100vw;

		ul {
			display: flex;
			justify-content: space-around;
		}

		.nav-entry {
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			opacity: 50%;

			span {
				font-size: 0.8rem;
			}
		}

		.nav-entry-focused {
			opacity: 100%;
		}
	}
</style>
