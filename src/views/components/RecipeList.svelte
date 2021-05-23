<script lang="ts">
  import type { HomeModel } from '../../../typings';

  export let model: HomeModel['RecipesList'];
</script>

<section>
  <ul class="recipe-list">
    {#each model.recipes as recipe}
    <li class="recipe">
      <a href={recipe.link}>
        <img src={recipe.imageSrc} alt={recipe.title} />
        <div>
          <h2>{recipe.title}</h2>
          <span>{recipe.tagsString}</span> 
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

    div {
      display: flex;
      flex-direction: column;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 500;
    }

    span {
      text-transform: capitalize;
      font-size: 0.8rem;
    }

    img {
      $size: 4rem;

      border-radius: 0.5rem;
      height: $size;
      margin-right: 0.5rem;
      width: $size;
    }
  }
</style>
