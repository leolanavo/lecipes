<script lang="ts">
  import type { Recipe } from '../../../typings';

  import Close from 'svelte-material-icons/Close.svelte';

  export let recipes: Recipe[] = [];
  const tags = Array.from(new Set(recipes.reduce((acc, r) => acc.concat(r.tags), [])));

  let selectedTags = null;

  const selectTag = (e) => {
    if (!selectedTags) {
      selectedTags = [];
    }

    selectedTags.push(e.target.innerText);
  };
  
  const cleanTags = () => {
    selectedTags = null;
  };
</script>

<section>
  <ul class="tag-list">
    {#if selectedTags}
      <li on:click={cleanTags}><Close /></li>
      {#each selectedTags as tag}
        <li class="selected"> {tag} </li>
      {/each}
    {:else}  
      {#each tags as tag}
        <li on:click={selectTag}> {tag} </li>
      {/each}
    {/if}
  </ul>
</section>

<style lang="scss">
  .tag-list {
    display: flex;
    margin: 0.5rem 1rem;
    overflow-x: auto;

    li {
      align-items: center;
      border: 1px solid #fff;
      border-radius: 1rem;
      display: flex;
      margin-right: 0.25rem;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
    }

    .selected {
      background: rgba($color: #73007d, $alpha: 1);
    }
  }
</style>