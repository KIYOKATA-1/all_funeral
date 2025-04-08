"use client";
import React, { useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { ICompany } from "@/services/company/company.types";
import SingleSelectDropdown from "../SingleSelectDropdown/SingleSelectDropdown";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";

interface CompanyDetailsProps {
  company: ICompany;
}

// Преобразует дату ISO (yyyy-mm-dd) -> дд.мм.гггг
function formatDateToDisplay(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// Преобразует дату дд.мм.гггг -> ISO (yyyy-mm-dd)
function parseDisplayDateToISO(displayDate: string): string {
  const [day, month, year] = displayDate.split(".");
  if (!day || !month || !year) return "";
  return `${year}-${month}-${day}`;
}

// Опции для Business entity (одиночный выбор)
const businessEntityOptions = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Company",
];

// Опции для Company type (множественный выбор)
const companyTypeOptions = [
  "Funeral Home",
  "Logistics services",
  "Burial care Contractor",
];

export default function CompanyDetails({ company }: CompanyDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Agreement number, Date, Business entity и Company type хранятся для совместимости,
  // но в режиме редактирования их изменение более не предусмотрено.
  const [agreementNumber, setAgreementNumber] = useState(company.contract.no);
  const initialDate = formatDateToDisplay(company.contract.issue_date);
  const [date, setDate] = useState(initialDate);
  const [businessEntity, setBusinessEntity] = useState(company.businessEntity);
  const [companyType, setCompanyType] = useState<string[]>(company.type);

  const handleSave = () => {
    const isoDate = parseDisplayDateToISO(date);
    const updatedData = {
      contract: {
        no: agreementNumber,
        issue_date: isoDate,
      },
      businessEntity,
      type: companyType,
    };
    console.log("Сохраняем данные: ", updatedData);
    setIsEditing(false);
  };

  return (
    <div className={`${styles.card} ${isEditing ? styles.editing : ""}`}>
      <div className={styles.cardHeader}>
        <h2>Company Details</h2>
        {!isEditing ? (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            <img src="/assets/icons/Edit.svg" alt="Edit" />
            Edit
          </button>
        ) : (
          <div className={styles.editActions}>
            <button className={styles.saveBtn} onClick={handleSave}>
              <img src="/assets/icons/save.svg" alt="Save" />
              Save changes
            </button>
            <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              <img src="/assets/icons/Cancel.svg" alt="Cancel" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className={styles.contentWrapper}>
        {/* VIEW MODE */}
        <div className={`${styles.content} ${!isEditing ? styles.active : ""}`}>
          <div className={styles.viewRow}>
            <span className={styles.label}>Agreement:</span>
            <span className={styles.value}>
              {company.contract.no} / {formatDateToDisplay(company.contract.issue_date)}
            </span>
          </div>
          <div className={styles.viewRow}>
            <span className={styles.label}>Business entity:</span>
            <span className={styles.value}>{businessEntity || "-"}</span>
          </div>
          <div className={styles.viewRow}>
            <span className={styles.label}>Company type:</span>
            <span className={styles.value}>
              {companyType.length ? companyType.join(", ") : "-"}
            </span>
          </div>
        </div>

        {/* EDIT MODE */}
        <div className={`${styles.content} ${isEditing ? styles.active : ""}`}>
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.left}>
                <p className={styles.num}>Agreement number:</p>
                <input
                  type="text"
                  value={agreementNumber}
                  onChange={(e) => setAgreementNumber(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.right}>
                <p className={styles.date}>Date:</p>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.first}>
                <p className={styles.name}>Business entity:</p>
                <SingleSelectDropdown
                  options={businessEntityOptions}
                  value={businessEntity}
                  onChange={setBusinessEntity}
                />
              </div>
              <div className={styles.second}>
                <p className={styles.name}>Company type:</p>
                <MultiSelectDropdown
                  options={companyTypeOptions}
                  values={companyType}
                  onChange={setCompanyType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
