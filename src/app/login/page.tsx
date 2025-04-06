'use client';

import { AuthService } from '@/services/auth/auth.service';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const { token } = await AuthService.login(username);
      setToken(token);
      localStorage.setItem('token', token);
      setError(null);
    } catch (err: any) {
      setError('Ошибка при авторизации');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Авторизация</h1>
      <input
        type="text"
        placeholder="Введите имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Войти
      </button>

      {token && (
        <div className="mt-4 text-green-600">
          Успешно! Токен: <code>{token}</code>
        </div>
      )}

      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}
