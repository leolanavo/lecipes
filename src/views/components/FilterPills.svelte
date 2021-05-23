<script lang="ts">
import { beforeUpdate } from 'svelte';

  import type { HomeModel } from '../../../typings';

  import Close from 'svelte-material-icons/Close.svelte';

  export let model: HomeModel['FilterPills'];

  let selectedTags = null;
  let level = 1;
  let renderedTags: string[] = (model.tagMap[1] as string[]);

  const selectTag = (e) => {
    const tag: string = e.target.innerText;

    if (!selectedTags) {
      selectedTags = [tag];
    } else {
      selectedTags = [...selectedTags, tag]
    }

    const key = tag.toLowerCase();

    if (model.tagMap[level + 1] && model.tagMap[level + 1][key]) {
      level++;
      renderedTags = model.tagMap[level][key];
    } else {
      renderedTags = [];
    }
  };

  const cleanTags = () => {
    selectedTags = null;
    level = 1;
    renderedTags = (model.tagMap[level] as string[]);
  };
</script>

<section>
  <ul class="tag-list">
    {#if selectedTags}
      <li on:click={cleanTags} class="tag close">
        <Close size="1.25rem"/>
      </li>
      {#each selectedTags as tag, index}
        <li 
          class="tag selected" 
          class:first-selected={index === 0}
          style={`transform: translateX(-${2 * index}rem); z-index: ${9999 - index};`}
        > 
          {tag} 
        </li>
      {/each}
    {/if}
    {#each renderedTags as tag}
      <li 
        on:click={selectTag} 
        class="tag"
        style={selectedTags ? `transform: translateX(-${2 * selectedTags.length - 2}rem);` : ''}
      > 
        {tag} 
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .tag-list {
    display: flex;
    margin: 0.5rem 1rem;
    overflow-x: auto;
  }

  .tag {
    align-items: center;
    border: 1px solid #fff;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    margin-right: 0.25rem;
    padding: 0.25rem 0.75rem;
    text-transform: capitalize;
  }

  .selected {
    position: relative;
    background: #73007d;
    padding-left: 2rem;
  }

  .first-selected {
    padding-left: 0.75rem;
  }

  .close {
    padding: 2px 0.25rem;
  }
</style>