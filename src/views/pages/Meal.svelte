<script lang="ts">
  import type { MealModel } from '../../../typings';

  import BottomNavigation from '../components/BottomNavigation.svelte';

  export let model: MealModel;
</script>

<main>
  <h1> Dieta </h1>
  <ul>
    {#each model.meals as meal}
    <li><a href={`/${meal.link}`}>{meal.name}</a></li>
    {/each}
  </ul>
  <BottomNavigation selectedNavEntry='Diet' />
</main>

<style lang="scss">
  main {
    background: #000;
    height: 100vh;
    width: 100vw;
  }

  h1 {
    padding: 1rem;
  }

  ul {
    margin: 1rem;
    margin-top: 0;
  }

  a { 
    background-color: rgba($color: #fff, $alpha: 0.9);
    border-radius: 0.5rem;
    color: #73007D;
    display: block;
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }


  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>