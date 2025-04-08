import axios from "axios";
import { ICompanyPhoto } from "./upload.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 *
 * @param companyId 
 * @param file 
 * @param token - Токен.
 * @returns 
 */
export const uploadCompanyImage = async (
  companyId: number,
  file: File,
  token: string
): Promise<ICompanyPhoto> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/companies/${companyId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/**
 * Удаляет изображение компании.
 *
 * @param companyId - ID компании.
 * @param imageName - Имя изображения.
 * @param token - Токен.
 */
export const deleteCompanyImage = async (
  companyId: number,
  imageName: string,
  token: string
): Promise<void> => {
  await axios.delete(
    `${API_URL}/companies/${companyId}/image/${imageName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
