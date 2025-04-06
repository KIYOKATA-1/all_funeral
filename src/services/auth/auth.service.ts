import axios from 'axios';
import { IAuthResponse } from './auth.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthService = {
  async login(user: string): Promise<IAuthResponse> {
    const response = await axios.get(`${API_URL}/auth`, {
      params: { user },
    });

    const token = response.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Token not found in response headers');
    }

    return { token };
  },
};
