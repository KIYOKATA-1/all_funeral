'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth/auth.service';
import { useSession } from '@/hooks/useSession';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setToken } = useSession(); 

  const handleLogin = async () => {
    try {
      const { token } = await AuthService.login(username);
      setToken(token); 
      setError(null);
      router.push('/main'); 
    } catch (err) {
      console.error(err);
      setError('Ошибка при авторизации');
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

      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}
