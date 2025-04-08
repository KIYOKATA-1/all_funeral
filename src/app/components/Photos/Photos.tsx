"use client";
import React from "react";
import Image from "next/image";
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
          <div className={styles.iconSmallWrapper}>
            <Image
              src="/assets/icons/photo.svg"
              alt="Add"
              fill
              className={styles.iconSmall}
            />
          </div>
          Add
        </button>
      </div>
      <div className={styles.photos}>
        {photos.map((photo) => (
          <div key={photo.filepath} className={styles.photoWrapper}>
            <div className={styles.photo}>
              <Image
                src={photo.thumbpath}
                alt={photo.name}
                fill
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
            <button className={styles.deleteBtn}>
              <div className={styles.iconSmallWrapper}>
                <Image
                  src="/assets/icons/Trash-2.svg"
                  alt="Delete"
                  fill
                  className={styles.iconSmall}
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
