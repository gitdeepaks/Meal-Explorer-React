import { MealsResponse } from './types/meal';

const BASE_URL = 'https://api.freeapi.app/api/v1';

export async function fetchMeals(page = 1, limit = 12, query = ''): Promise<MealsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (query.trim()) {
    params.set('query', query.trim());
  }
  const res = await fetch(`${BASE_URL}/public/meals?${params}`, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch meals');
  return res.json();
}

export interface LoginUser {
  _id?: string;
  username: string;
  email?: string;
  avatar?: { url?: string } | string;
  role?: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    user: LoginUser;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data?.message || 'Invalid credentials');
  }
  return data;
}

export interface RegisterResponse {
  statusCode: number;
  data: { user: LoginUser };
  message: string;
  success: boolean;
}

export async function register(username: string, email: string, password: string, role?: string): Promise<RegisterResponse> {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role: role || 'ADMIN' }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data?.message || 'Registration failed');
  }
  return data;
}
