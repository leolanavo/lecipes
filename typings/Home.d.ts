interface Recipe {
  imageSrc: string;
  title: string;
  tags: string[];
}

export interface HomeModel {
  RecipesList: {
    recipes: Recipe[];
  }
  FilterPills: {
    tagList: string[];
  }
}