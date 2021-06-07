import type { RecipeRequest, Reply } from '../../../typings';
import fp from 'fastify-plugin';

import WeekdayConverter from '../converters/Weekday';
import MealConverter from '../converters/Meal';

export default fp((app, _opts, next) => {
  app.get('/diet', (request: RecipeRequest, reply: Reply) => {
    reply.view('Diet', WeekdayConverter.convert());
  });

  app.get('/diet/:weekday', (request: RecipeRequest, reply: Reply) => {
    reply.view('Meal', MealConverter.convert());
  });
  
  next();
});