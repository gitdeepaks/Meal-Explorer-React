import { X, MapPin, Tag, ExternalLink, Youtube } from 'lucide-react';
import { Meal } from '../types/meal';
import { getIngredients } from '../utils';

interface Props {
  meal: Meal;
  onClose: () => void;
}

export function MealDetail({ meal, onClose }: Props) {
  const ingredients = getIngredients(meal);
  const instructions = meal.strInstructions.split('\r\n').filter(Boolean);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />
      <div
        className="me-slide-up"
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: 768,
          margin: '32px 0',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', height: 320 }}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent 60%)',
            }}
          />
          <button
            onClick={onClose}
            className="me-close-btn"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              padding: 8,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(4px)',
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
              }}
            >
              {meal.strMeal}
            </h2>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: 'rgba(255,255,255,0.85)',
                fontSize: 13,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} />
                {meal.strArea}
              </span>
              <span
                style={{
                  padding: '2px 10px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 999,
                  fontSize: 12,
                }}
              >
                {meal.strCategory}
              </span>
              {meal.strTags && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Tag size={14} />
                  {meal.strTags}
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="me-link-btn red"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  background: '#fef2f2',
                  color: '#dc2626',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <Youtube size={14} />
                Watch Video
              </a>
            )}
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="me-link-btn teal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  background: '#f0fdfa',
                  color: '#0d9488',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <ExternalLink size={14} />
                Source Recipe
              </a>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
              gap: 32,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#111827',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 12,
                }}
              >
                Ingredients
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ingredients.map(({ ingredient, measure }, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 8,
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: '#2dd4bf',
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    <span style={{ color: '#374151' }}>
                      <span style={{ fontWeight: 500 }}>{ingredient}</span>
                      {measure && (
                        <span style={{ color: '#9ca3af', marginLeft: 4 }}>({measure})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#111827',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 12,
                }}
              >
                Instructions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {instructions.map((step, i) => (
                  <p
                    key={i}
                    style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6 }}
                  >
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
