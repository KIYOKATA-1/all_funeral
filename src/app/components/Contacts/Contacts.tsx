"use client";
import React from "react";
import { ICompany } from "@/services/company/company.types";
import styles from "./Contacts.module.scss";

interface ContactsProps {
  company: ICompany;
}

export default function Contacts({ company }: ContactsProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Contacts</h2>
        <button className={styles.editBtn}>
          <img src="/assets/icons/Edit.svg" alt="Edit" className={styles.iconSmall} />
          Edit
        </button>
      </div>
      <div className={styles.details}>
        <div>
          <span>Responsible person:</span> {company.responsiblePerson ?? "—"}
        </div>
        <div>
          <span>Phone number:</span> {company.phone ?? "—"}
        </div>
        <div>
          <span>E-mail:</span> {company.email ?? "—"}
        </div>
      </div>
    </div>
  );
}
