import { MapPin, Tag, ChevronRight } from 'lucide-react';
import { Meal } from '../types/meal';
import { getIngredients } from '../utils';

interface Props {
  meals: Meal[];
  onSelect: (meal: Meal) => void;
}

export function MealList({ meals, onSelect }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {meals.map((meal) => {
        const ingredients = getIngredients(meal);
        return (
          <button
            key={meal.idMeal}
            onClick={() => onSelect(meal)}
            className="me-list-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: '#fff',
              borderRadius: 12,
              padding: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              textAlign: 'left',
              border: '1px solid #f3f4f6',
              width: '100%',
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                className="me-list-title me-truncate"
                style={{
                  fontWeight: 600,
                  color: '#111827',
                  fontSize: 14,
                  transition: 'color 0.2s',
                }}
              >
                {meal.strMeal}
              </h3>
              <div
                style={{
                  marginTop: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 12,
                  color: '#6b7280',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={12} />
                  {meal.strArea}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    background: '#f3f4f6',
                    borderRadius: 999,
                    fontSize: 11,
                  }}
                >
                  {meal.strCategory}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Tag size={12} />
                  {ingredients.length} items
                </span>
              </div>
              <p
                className="me-clamp-1"
                style={{ marginTop: 6, fontSize: 12, color: '#9ca3af' }}
              >
                {meal.strInstructions}
              </p>
            </div>
            <ChevronRight
              size={18}
              className="me-list-chevron"
              style={{ color: '#d1d5db', flexShrink: 0, transition: 'color 0.2s' }}
            />
          </button>
        );
      })}
    </div>
  );
}
