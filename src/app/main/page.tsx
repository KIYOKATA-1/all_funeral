"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CompanyService } from "@/services/company/company.service";
import { ICompany } from "@/services/company/company.types";
import { useSession } from "@/hooks/useSession";
import styles from "./MainPage.module.scss";

import CompanyDetails from "../components/CompanyDetails/CompanyDetails";
import Contacts from "../components/Contacts/Contacts";
import Photos from "../components/Photos/Photos";
import EditCompanyNameModal from "../components/EditCompanyNameModal/EditCompanyNameModal";
import DeleteCompanyModal from "../components/DeleteCompanyModal/DeleteCompanyModal";

export default function MainPage() {
  const [company, setCompany] = useState<ICompany | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditingContacts, setIsEditingContacts] = useState(false);

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

  useEffect(() => {
    if (isEditingContacts) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isEditingContacts]);

  const handleSaveName = async (newName: string) => {
    if (!company || !token) return;
    try {
      const updated = await CompanyService.updateCompany(company.id.toString(), token, {
        name: newName,
      });
      setCompany(updated);
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Ошибка обновления названия компании");
    }
  };

  const handleDeleteCompany = async () => {
    if (!company || !token) return;
    try {
      await CompanyService.deleteCompany(company.id.toString(), token);
      router.push("/companies");
    } catch (err) {
      alert("Ошибка удаления компании");
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!company) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      {isEditModalOpen && (
        <EditCompanyNameModal
          initialName={company.name}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveName}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCompanyModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteCompany}
        />
      )}

      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <button className={styles.backButton}>
            <Image
              src="/assets/icons/chevroneLeft.svg"
              alt="Back"
              className={styles.icon}
              width={20}
              height={20}
            />
          </button>
          <h1 className={styles.title}>{company.name}</h1>
        </div>
        <div className={styles.icons}>
          <button className={styles.iconButton} onClick={() => setIsEditModalOpen(true)}>
            <Image
              src="/assets/icons/Edit.svg"
              alt="Edit"
              className={styles.icon}
              width={20}
              height={20}
            />
          </button>
          <button className={styles.iconButton} onClick={() => setIsDeleteModalOpen(true)}>
            <Image
              src="/assets/icons/Trash.svg"
              alt="Delete"
              className={styles.icon}
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <CompanyDetails company={company} />
      <Contacts
        company={company}
        isEditing={isEditingContacts}
        setIsEditing={setIsEditingContacts}
      />
      <Photos photos={company.photos} />
    </div>
  );
}
