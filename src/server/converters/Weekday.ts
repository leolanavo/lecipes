import type { Weekday } from '../../../typings';

export default {
  convert() {
    const weekdays: Weekday[] = [
      { link: 'monday', name: 'Segunda-feira' },
      { link: 'tuesday', name: 'Terça-feira' },
      { link: 'wednesday', name: 'Quarta-feira' },
      { link: 'thursday', name: 'Quinta-feira' },
      { link: 'friday', name: 'Sexta-feira' },
    ];

    return { weekdays };
  }
}