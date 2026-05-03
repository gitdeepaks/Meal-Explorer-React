import { Grid3x3 as Grid3X3, List, Table } from 'lucide-react';
import { ViewMode } from '../types/meal';

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const views: { mode: ViewMode; icon: typeof Grid3X3; label: string }[] = [
  { mode: 'grid', icon: Grid3X3, label: 'Grid' },
  { mode: 'list', icon: List, label: 'List' },
  { mode: 'compact', icon: Table, label: 'Table' },
];

export function ViewToggle({ mode, onChange }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f3f4f6',
        borderRadius: 8,
        padding: 4,
      }}
    >
      {views.map(({ mode: m, icon: Icon, label }) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={`me-view-btn${active ? ' active' : ''}`}
            title={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              background: active ? '#fff' : 'transparent',
              color: active ? '#0f766e' : '#6b7280',
              boxShadow: active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <Icon size={14} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
