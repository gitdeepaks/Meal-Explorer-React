import { useState } from 'react';
import { UtensilsCrossed, User, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { login, register, LoginUser } from '../api';

interface Props {
  onLogin: (user: LoginUser, token: string) => void;
}

export function Login({ onLogin }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    if (isRegister && !email) return;
    setLoading(true);
    setError('');
    try {
      if (isRegister) {
        await register(username.trim(), email.trim(), password);
        const res = await login(username.trim(), password);
        onLogin(res.data.user, res.data.accessToken);
      } else {
        const res = await login(username.trim(), password);
        onLogin(res.data.user, res.data.accessToken);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const useDemo = () => {
    setUsername('doejohn');
    setPassword('test@123');
    setIsRegister(false);
  };

  const validForm = isRegister ? username && email && password : username && password;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(135deg, #f0fdfa 0%, #f7f8fa 50%, #ecfdf5 100%)',
      }}
    >
      <div
        className="me-slide-up"
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          padding: 40,
          border: '1px solid #f3f4f6',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div
            style={{
              padding: 14,
              background: '#f0fdfa',
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <UtensilsCrossed size={28} color="#0d9488" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
            {isRegister ? 'Create account' : 'Welcome back'}
          </h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 6, textAlign: 'center' }}>
            {isRegister
              ? 'Sign up to start exploring recipes'
              : 'Sign in to explore delicious recipes'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <User
              size={16}
              color="#9ca3af"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              disabled={loading}
              className="me-input"
              style={{
                width: '100%',
                padding: '12px 14px 12px 40px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                fontSize: 14,
                color: '#111827',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            />
          </div>

          {isRegister && (
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                color="#9ca3af"
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="email"
                disabled={loading}
                className="me-input"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                  fontSize: 14,
                  color: '#111827',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Lock
              size={16}
              color="#9ca3af"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              disabled={loading}
              className="me-input"
              style={{
                width: '100%',
                padding: '12px 14px 12px 40px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                fontSize: 14,
                color: '#111827',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            />
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 12px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 8,
                fontSize: 13,
                color: '#b91c1c',
              }}
            >
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !validForm}
            style={{
              marginTop: 4,
              padding: '12px 16px',
              background: loading || !validForm ? '#94a3b8' : '#0d9488',
              color: '#fff',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: loading || !validForm ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            {loading && <Loader2 size={16} className="me-spin" />}
            {loading
              ? isRegister ? 'Creating account...' : 'Signing in...'
              : isRegister ? 'Create account' : 'Sign in'}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            <button
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              disabled={loading}
              style={{ fontSize: 12, color: '#0d9488', fontWeight: 500, padding: 4 }}
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
            {!isRegister && (
              <button
                type="button"
                onClick={useDemo}
                disabled={loading}
                style={{ fontSize: 12, color: '#6b7280', fontWeight: 500, padding: 4 }}
              >
                Use demo
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
