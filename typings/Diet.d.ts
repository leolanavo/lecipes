type WeekdayEnum = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

type MealEnum = 'breakfast' | 'morning-snack' | 'lunch' | 'afternoon-snack' | 'late-afternoon-snack' | 'dinner';

export interface Weekday {
  name: string;
  link: WeekdayEnum;
}

export interface Meal {
  name: string;
  link: MealEnum;
}

export interface DietModel {
  weekdays: Weekday[];
}

export interface MealModel {
  meals: Meal[];
}