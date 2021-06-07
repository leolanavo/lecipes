import type { Meal } from '../../../typings';

export default {
  convert() {
    const meals: Meal[] = [
      { link: 'breakfast', name: 'Café da manhã' },
      { link: 'morning-snack', name: 'Lanche da manhã' },
      { link: 'lunch', name: 'Almoço' },
      { link: 'afternoon-snack', name: 'Lanche da tarde' },
      { link: 'late-afternoon-snack', name: 'Lanche de fim de tarde' },
      { link: 'dinner', name: 'Jantar' },
    ];

    return { meals };
  }
}