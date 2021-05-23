<script lang="ts">
  import type { Recipe } from '../../../typings';

  export let recipes: Recipe[] = [];
</script>

<section>
  <ul class="recipe-list">
    {#each recipes as recipe}
    <li class="recipe">
      <a href="">
        <img src={recipe.imageSrc} alt={recipe.title} />
        <div>
          <h2>{recipe.title}</h2>
          <ul class="tag-list">
            {#each recipe.tags as tag}
              <li>{tag}</li>
            {/each}
          </ul>
        </div>
      </a>
    </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .recipe-list {
    margin-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .recipe {
    background-color: rgba($color: #fff, $alpha: 0.2);
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.5rem;

    &:first-of-type {
      margin-top: 0;
    }

    a {
      color: #fff;
      display: flex;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 500;
    }

    img {
      $size: 4rem;

      border-radius: 0.5rem;
      height: $size;
      margin-right: 0.5rem;
      width: $size;
    }
  }

  .tag-list {
    display: flex;
    margin-top: 0.2rem;

  }

  .tag-list > li {
    font-size: 0.8rem;
    font-weight: 300;
    margin-right: 0.25rem;
    
    &:first-of-type {
      text-transform: capitalize;
    }
  }
</style>
