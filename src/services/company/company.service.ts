import axios from 'axios';
import { ICompany } from './company.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CompanyService = {
  async getCompany(id: string, token: string): Promise<ICompany> {
    const response = await axios.get(`${API_URL}/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  },
};
