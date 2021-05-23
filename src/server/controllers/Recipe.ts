import type { RecipeRequest } from '../../../typings';
import fp from 'fastify-plugin';

import type { Reply } from '../../../typings';

import RecipeConverter from '../converters/Recipe';

export default fp((app, _opts, next) => {
  app.get('/recipe/:id', (request: RecipeRequest, reply: Reply) => {
    const model = RecipeConverter.convert(request)
    reply.view('Recipe', model);
  });
  
  next();
});