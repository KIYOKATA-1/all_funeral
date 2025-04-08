"use client";
import React, { useState } from "react";
import styles from "./UploadModal.module.scss";
import { uploadCompanyImage } from "@/services/upload/upload.service";
import { ICompanyPhoto } from "@/services/company/company.types";

interface UploadModalProps {
  companyId: number;
  token: string;
  onUploadSuccess: (newPhoto: ICompanyPhoto) => void;
  onClose: () => void;
}

export default function UploadModal({
  companyId,
  token,
  onUploadSuccess,
  onClose,
}: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const removePreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);

    try {
      const response = await uploadCompanyImage(companyId, selectedFile, token);
      onUploadSuccess(response);
    } catch (e) {
      console.error(e);
      setError("Ошибка при загрузке изображения");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Upload Company Photo</h2>

        {!previewUrl && (
          <div className={styles.uploadArea}>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept="image/*"
              className={styles.hiddenInput}
            />
            <label htmlFor="fileInput" className={styles.uploadBox}>
              +
            </label>
          </div>
        )}

        {previewUrl && (
          <div className={styles.imagePreviewWrapper}>
            <img src={previewUrl} alt="Preview" className={styles.imagePreview} />
            <button className={styles.closePreviewBtn} onClick={removePreview}>
              &times;
            </button>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button onClick={onClose} disabled={uploading} className={styles.cancelBtn}>
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={styles.saveBtn}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
