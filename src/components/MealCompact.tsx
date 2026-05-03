import { MapPin } from 'lucide-react';
import { Meal } from '../types/meal';

interface Props {
  meals: Meal[];
  onSelect: (meal: Meal) => void;
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px 16px',
  fontWeight: 500,
  color: '#6b7280',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #f9fafb',
};

export function MealCompact({ meals, onSelect }: Props) {
  return (
    <div
      style={{
        overflowX: 'auto',
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #f3f4f6',
      }}
    >
      <table style={{ width: '100%', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={thStyle}>Meal</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Origin</th>
            <th style={thStyle}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr
              key={meal.idMeal}
              onClick={() => onSelect(meal)}
              className="me-row"
              style={{ cursor: 'pointer' }}
            >
              <td style={tdStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }}
                  />
                  <span
                    className="me-row-title me-truncate"
                    style={{
                      fontWeight: 500,
                      color: '#111827',
                      maxWidth: 220,
                      transition: 'color 0.2s',
                    }}
                  >
                    {meal.strMeal}
                  </span>
                </div>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: '2px 8px',
                    background: '#f3f4f6',
                    borderRadius: 999,
                    fontSize: 12,
                    color: '#4b5563',
                  }}
                >
                  {meal.strCategory}
                </span>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: '#6b7280',
                    fontSize: 12,
                  }}
                >
                  <MapPin size={12} />
                  {meal.strArea}
                </span>
              </td>
              <td style={tdStyle}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{meal.strTags || '—'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
