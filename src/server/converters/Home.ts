import type { CategoriesMap, HomeModel } from '../../../typings';

import categories from '../data/categories';
import recipes from '../data/recipes';

export default {
  convert(): HomeModel {
    const tagMap: CategoriesMap = {};
    reduceCategories(tagMap, categories, 1)

    const convertRecipes = r => {
      return { 
        ...r, 
        tagsString: r.tags.join(', '),
        link: `/recipe/${r.title.toLowerCase()}`
      };
    };

    return { 
      RecipesList: { 
        recipes: recipes.map(convertRecipes),
      },
      FilterPills: { tagMap },
    };
  },
};

function reduceCategories(acc: CategoriesMap, base: any, level: number, key?: string) {
  const keys = Object.keys(base);

  if (!acc[level]) {
    acc[level] = {};
  }

  if (key) {
    acc[level][key] = keys;
  }
  else {
    acc[level] = keys;
  }

  keys.forEach(k => {
    if (Array.isArray(base[k])) {
      if (!acc[level + 1]) {
        acc[level + 1] = {};
      }
      acc[level + 1][k] = base[k];
    }
    else {
      reduceCategories(acc, base[k], level + 1, k);
    }
  });
}
