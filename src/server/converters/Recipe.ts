import type { RecipeModel, RecipeRequest } from '../../../typings';

import recipes from '../data/recipes';

export default {
  convert(request: RecipeRequest): RecipeModel {
    const id = request.params.id;
    const recipe = recipes.find(r => r.title.toLowerCase() === id);

    return { 
      recipe: recipe,
    };
  },
};
