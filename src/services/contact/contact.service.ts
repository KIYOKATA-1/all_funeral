import { IContact, IUpdateContact } from "./contact.types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ContactService = {
  async getContact(id: string, token: string): Promise<IContact> {
    const res = await fetch(`${API_URL}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Ошибка при получении контакта");
    return res.json();
  },

  async updateContact(id: string, token: string, data: IUpdateContact): Promise<IContact> {
    const res = await fetch(`${API_URL}/contacts/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка при обновлении контакта");
    return res.json();
  },
};
