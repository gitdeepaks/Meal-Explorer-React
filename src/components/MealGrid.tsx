import { MapPin, Tag } from 'lucide-react';
import { Meal } from '../types/meal';
import { getIngredients } from '../utils';

interface Props {
  meals: Meal[];
  onSelect: (meal: Meal) => void;
}

export function MealGrid({ meals, onSelect }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 24,
      }}
    >
      {meals.map((meal) => {
        const ingredients = getIngredients(meal);
        return (
          <button
            key={meal.idMeal}
            onClick={() => onSelect(meal)}
            className="me-card"
            style={{
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              textAlign: 'left',
              border: '1px solid #f3f4f6',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 3' }}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="me-card-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s',
                }}
              />
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
                <span
                  style={{
                    padding: '4px 10px',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 500,
                    color: '#374151',
                  }}
                >
                  {meal.strCategory}
                </span>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <h3
                className="me-card-title me-clamp-2"
                style={{
                  fontWeight: 600,
                  color: '#111827',
                  fontSize: 14,
                  lineHeight: 1.35,
                  transition: 'color 0.2s',
                }}
              >
                {meal.strMeal}
              </h3>
              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 12,
                  color: '#6b7280',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={12} />
                  {meal.strArea}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Tag size={12} />
                  {ingredients.length} ingredients
                </span>
              </div>
              {meal.strTags && (
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {meal.strTags.split(',').slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '2px 8px',
                        background: '#f0fdfa',
                        color: '#0f766e',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
