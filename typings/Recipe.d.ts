import type { FastifyRequest  } from 'fastify';

import type { Recipe } from '.';

export interface RecipeModel {
  recipe: Recipe
}

export type RecipeRequest = FastifyRequest<{ Params: { id: string } }>;
