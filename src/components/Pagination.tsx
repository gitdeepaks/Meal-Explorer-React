import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    padding: 8,
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    color: '#6b7280',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 32,
      }}
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="me-page-btn"
        style={btnStyle(page <= 1)}
      >
        <ChevronLeft size={16} />
      </button>
      <span style={{ fontSize: 14, color: '#4b5563', padding: '0 12px' }}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="me-page-btn"
        style={btnStyle(page >= totalPages)}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
