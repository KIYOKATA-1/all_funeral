"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Photos.module.scss";
import UploadModal from "../UploadModal/UploadModal";
import { ICompanyPhoto } from "@/services/upload/upload.types";
import {
  deleteCompanyImage,
  uploadCompanyImage,
} from "@/services/upload/upload.service";

interface PhotosProps {
  photos: ICompanyPhoto[];
  companyId: number;
  token: string;
  onUploadSuccess: (newPhotos: ICompanyPhoto[]) => void;
}

export default function Photos({
  photos: initialPhotos,
  companyId,
  token,
  onUploadSuccess,
}: PhotosProps) {
  const [photos, setPhotos] = useState<ICompanyPhoto[]>(initialPhotos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUploadSuccess = (newPhoto: ICompanyPhoto) => {
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    onUploadSuccess(updatedPhotos);
    setIsModalOpen(false);
  };

  const handleDelete = async (imageName: string) => {
    try {
      await deleteCompanyImage(companyId, imageName, token);
      const updatedPhotos = photos.filter((photo) => photo.name !== imageName);
      setPhotos(updatedPhotos);
      onUploadSuccess(updatedPhotos);
    } catch (error) {
      console.error("Ошибка при удалении фото:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Photos</h2>
        <button className={styles.addBtn} onClick={handleAddClick}>
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
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(photo.name)}
            >
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

      {isModalOpen && (
        <UploadModal
          companyId={companyId}
          token={token}
          onUploadSuccess={handleUploadSuccess}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
