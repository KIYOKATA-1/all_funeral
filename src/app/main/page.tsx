"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyService } from "@/services/company/company.service";
import { ICompany } from "@/services/company/company.types";
import { useSession } from "@/hooks/useSession";
import styles from "./MainPage.module.scss";
import CompanyDetails from "../components/CompanyDetails/CompanyDetails";
import Contacts from "../components/Contacts/Contacts";
import Photos from "../components/Photos/Photos";

export default function MainPage() {
  const [company, setCompany] = useState<ICompany | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    CompanyService.getCompany("12", token)
      .then(setCompany)
      .catch(() => setError("Ошибка загрузки данных компании"));
  }, [token, router]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!company) return <div className={styles.loading}>Загрузка...</div>;

  const handleUpdate = (updatedCompany: ICompany) => {
    setCompany(updatedCompany);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{company.name}</h1>
        <div className={styles.icons}>
          <img src="/assets/icons/Edit.svg" alt="Edit" className={styles.icon} />
          <img src="/assets/icons/Trash.svg" alt="Delete" className={styles.icon} />
        </div>
      </div>

      <CompanyDetails company={company} />
      <Contacts company={company} />
      <Photos photos={company.photos} />
    </div>
  );
}
