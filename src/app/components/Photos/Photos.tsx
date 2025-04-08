"use client";
import React from "react";
import { ICompanyPhoto } from "@/services/company/company.types";
import styles from "./Photos.module.scss";

interface PhotosProps {
  photos: ICompanyPhoto[];
}

export default function Photos({ photos }: PhotosProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Photos</h2>
        <button className={styles.addBtn}>
          <img src="/assets/icons/photo.svg" alt="Add" className={styles.iconSmall} />
          Add
        </button>
      </div>
      <div className={styles.photos}>
        {photos.map((photo) => (
          <div key={photo.filepath} className={styles.photoWrapper}>
            <img src={photo.thumbpath} alt={photo.name} className={styles.photo} />
            <button className={styles.deleteBtn}>
              <img src="/assets/icons/Trash-2.svg" alt="Delete" className={styles.iconSmall} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
