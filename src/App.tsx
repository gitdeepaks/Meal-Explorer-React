import { useCallback, useEffect, useState } from 'react';
import { UtensilsCrossed, Loader2, LogOut } from 'lucide-react';
import { Meal, ViewMode } from './types/meal';
import { fetchMeals, LoginUser } from './api';
import { MealGrid } from './components/MealGrid';
import { MealList } from './components/MealList';
import { MealCompact } from './components/MealCompact';
import { MealDetail } from './components/MealDetail';
import { SearchBar } from './components/SearchBar';
import { ViewToggle } from './components/ViewToggle';
import { Pagination } from './components/Pagination';
import { Login } from './components/Login';

const STORAGE_KEY = 'meal_explorer_auth';

interface AuthState {
  user: LoginUser;
  token: string;
}

function App() {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthState) : null;
    } catch {
      return null;
    }
  });

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const loadMeals = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchMeals(page, 12, query);
      setMeals(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);
    } catch {
      setError('Failed to load meals. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    if (auth) loadMeals();
  }, [loadMeals, auth]);

  const handleLogin = (user: LoginUser, token: string) => {
    const state = { user, token };
    setAuth(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage errors
    }
  };

  const handleLogout = () => {
    setAuth(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage errors
    }
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  if (!auth) {
    return <Login onLogin={handleLogin} />;
  }

  const avatarUrl =
    typeof auth.user.avatar === 'string'
      ? auth.user.avatar
      : auth.user.avatar?.url;

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #f3f4f6',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 8, background: '#f0fdfa', borderRadius: 12 }}>
              <UtensilsCrossed size={22} color="#0d9488" />
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
                Meal Explorer
              </h1>
              <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                {totalItems} recipes available
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flex: '1 1 auto',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <SearchBar onSearch={handleSearch} initialQuery={query} />
            <ViewToggle mode={viewMode} onChange={setViewMode} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                paddingLeft: 12,
                borderLeft: '1px solid #e5e7eb',
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={auth.user.username}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    objectFit: 'cover',
                    border: '1px solid #e5e7eb',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: '#0d9488',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {auth.user.username.slice(0, 1)}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontSize: 12, color: '#6b7280' }}>Signed in</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                  {auth.user.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                style={{
                  padding: 8,
                  borderRadius: 8,
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.15s, color 0.15s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#fef2f2';
                  e.currentTarget.style.color = '#dc2626';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 0' }}>
            <Loader2 size={32} color="#14b8a6" className="me-spin" />
          </div>
        )}

        {error && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '96px 0',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#6b7280', marginBottom: 16 }}>{error}</p>
            <button
              onClick={loadMeals}
              style={{
                padding: '8px 16px',
                background: '#0d9488',
                color: '#fff',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && meals.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '96px 0',
              textAlign: 'center',
            }}
          >
            <UtensilsCrossed size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
            <p style={{ color: '#6b7280' }}>No meals found. Try a different search.</p>
          </div>
        )}

        {!loading && !error && meals.length > 0 && (
          <>
            {viewMode === 'grid' && <MealGrid meals={meals} onSelect={setSelectedMeal} />}
            {viewMode === 'list' && <MealList meals={meals} onSelect={setSelectedMeal} />}
            {viewMode === 'compact' && <MealCompact meals={meals} onSelect={setSelectedMeal} />}
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>

      {selectedMeal && (
        <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}

export default App;
