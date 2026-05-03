import { Meal } from './types/meal';

export function getIngredients(meal: Meal): { ingredient: string; measure: string }[] {
  const items: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;
    if (ingredient && ingredient.trim()) {
      items.push({ ingredient: ingredient.trim(), measure: (measure || '').trim() });
    }
  }
  return items;
}
