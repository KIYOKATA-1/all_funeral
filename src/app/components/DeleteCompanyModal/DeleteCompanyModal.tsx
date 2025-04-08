"use client";
import { useRef, useEffect } from "react";
import styles from "./DeleteCompanyModal.module.scss";

interface DeleteCompanyModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCompanyModal({ onClose, onConfirm }: DeleteCompanyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <p className={styles.title}>Remove the Organization?</p>
        <p className={styles.subtitle}>Are you sure you want to remove this Organization?</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>No</button>
          <button className={styles.delete} onClick={onConfirm}>Yes, remove</button>
        </div>
      </div>
    </div>
  );
}
