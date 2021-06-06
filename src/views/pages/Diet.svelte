<script lang="ts">
  import type { HomeModel } from '../../../typings';

  import Hydrate from '../components/Hydrate.svelte';

  import BottomNavigation from '../components/BottomNavigation.svelte';

  type WeekdayEnum = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

  interface Weekday {
    name: string;
    link: WeekdayEnum;
  }

  const weekdays: Weekday[] = [
    { link: 'monday', name: 'Segunda-feira' },
    { link: 'tuesday', name: 'Terça-feira' },
    { link: 'wednesday', name: 'Quarta-feira' },
    { link: 'thursday', name: 'Quinta-feira' },
    { link: 'friday', name: 'Sexta-feira' },
  ];
</script>

<main>
  <h1> Dieta </h1>
  <ul>
    {#each weekdays as weekday}
    <li><a href={`/${weekday.link}`}>{weekday.name}</a></li>
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
    color: white;
  }


  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>