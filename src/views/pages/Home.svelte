<script lang="ts">
  import type { HomeModel } from '../../../typings';

  import Hydrate from '../components/Hydrate.svelte';

  import BottomNavigation from '../components/BottomNavigation.svelte';
  import FilterPills from '../components/FilterPills.svelte';
  import RecipeList from '../components/RecipeList.svelte';
  import Title from '../components/Title.svelte';

  export let model: HomeModel;
</script>

<main>
  <Title />
  <Hydrate
    name="FilterPills"
    component={FilterPills}
    props={{ model: model.FilterPills }}
  />
  <RecipeList model={model.RecipesList} />
  <BottomNavigation selectedNavEntry='Home' />
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