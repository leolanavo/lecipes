import type { RecipeRequest } from '../../../typings';
import fp from 'fastify-plugin';

import type { Reply } from '../../../typings';

export default fp((app, _opts, next) => {
  app.get('/diet', (request: RecipeRequest, reply: Reply) => {
    reply.view('Diet', {});
  });
  
  next();
});