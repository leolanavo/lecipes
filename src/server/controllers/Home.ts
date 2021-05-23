import fp from 'fastify-plugin';

import type { Reply } from '../../../typings';

import HomeConverter from '../converters/Home';

export default fp((app, _opts, next) => {
  app.get('/', (_request, reply: Reply) => {
    reply.view('Home', HomeConverter.convert());
  });
  
  next();
});