import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export function SearchBar({ onSearch, initialQuery }: Props) {
  const [value, setValue] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      <Search
        size={16}
        color="#9ca3af"
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search meals..."
        className="me-input"
        style={{
          width: '100%',
          padding: '10px 40px',
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          fontSize: 14,
          color: '#111827',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
