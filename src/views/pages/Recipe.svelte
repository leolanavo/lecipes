<script lang="ts">
  import type { RecipeModel } from '../../../typings';
  export let model: RecipeModel;
</script>

<main>
  <h1>{model.recipe.title}</h1>
</main>