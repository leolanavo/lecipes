export type Categories = Record<string, Record<string, string[]>>;
export type CategoriesMap = Record<number, string[] | Record<string, string[]>>;

export interface Recipe {
  imageSrc: string;
  title: string;
  tags: string[];
}

export type VisualRecipe = Recipe & {
  tagsString: string;
  link: string;
}

export interface HomeModel {
  RecipesList: {
    recipes: VisualRecipe[];
  }
  FilterPills: {
    tagMap: CategoriesMap;
  }
}