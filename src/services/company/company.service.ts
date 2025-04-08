import axios from 'axios';
import { ICompany } from './company.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CompanyService = {
  async getCompany(id: string, token: string): Promise<ICompany> {
    const response = await axios.get(`${API_URL}/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async updateCompany(id: string, token: string, updatedData: Partial<ICompany>): Promise<ICompany> {
    const response = await axios.patch(`${API_URL}/companies/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async deleteCompany(id: string, token: string): Promise<void> {
    await axios.delete(`${API_URL}/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
