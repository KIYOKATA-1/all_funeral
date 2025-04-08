"use client";
import React, { useState } from "react";
import { ICompany } from "@/services/company/company.types";
import styles from "./Contacts.module.scss";

interface ContactsProps {
  company: ICompany;
}

export default function Contacts({ company }: ContactsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [responsiblePerson, setResponsiblePerson] = useState(company.responsiblePerson ?? "");
  const [phone, setPhone] = useState(company.phone ?? "");
  const [email, setEmail] = useState(company.email ?? "");

  const handleSave = () => {
    console.log("Сохранены данные:", { responsiblePerson, phone, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setResponsiblePerson(company.responsiblePerson ?? "");
    setPhone(company.phone ?? "");
    setEmail(company.email ?? "");
    setIsEditing(false);
  };

  return (
    <div className={`${styles.card} ${isEditing ? styles.editing : ""}`}>
      <div className={styles.cardHeader}>
        <h2>Contacts</h2>
        {!isEditing ? (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            <img src="/assets/icons/Edit.svg" alt="Edit" className={styles.iconSmall} />
            Edit
          </button>
        ) : (
          <div className={styles.editActions}>
            <button className={styles.saveBtn} onClick={handleSave}>
              <img src="/assets/icons/save.svg" alt="Save" className={styles.iconSmall} />
              Save changes
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              <img src="/assets/icons/Cancel.svg" alt="Cancel" className={styles.iconSmall} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className={styles.contentWrapper}>
        {/* Режим просмотра */}
        <div className={`${styles.content} ${!isEditing ? styles.active : ""}`}>
          <div className={styles.viewRow}>
            <span className={styles.label}>Responsible person:</span>
            <span className={styles.value}>{responsiblePerson || "—"}</span>
          </div>
          <div className={styles.viewRow}>
            <span className={styles.label}>Phone number:</span>
            <span className={styles.value}>{phone || "—"}</span>
          </div>
          <div className={styles.viewRow}>
            <span className={styles.label}>E-mail:</span>
            <span className={styles.value}>{email || "—"}</span>
          </div>
        </div>

        {/* Режим редактирования */}
        <div className={`${styles.content} ${isEditing ? styles.active : ""}`}>
          <div className={styles.editRow}>
            <label className={styles.label}>Responsible person:</label>
            <input
              type="text"
              className={styles.input}
              value={responsiblePerson}
              onChange={(e) => setResponsiblePerson(e.target.value)}
            />
          </div>
          <div className={styles.editRow}>
            <label className={styles.label}>Phone number:</label>
            <input
              type="text"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={styles.editRow}>
            <label className={styles.label}>E-mail:</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
