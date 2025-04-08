"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./EditCompanyNameModal.module.scss";

interface EditCompanyNameModalProps {
  initialName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export default function EditCompanyNameModal({
  initialName,
  onClose,
  onSave,
}: EditCompanyNameModalProps) {
  const [name, setName] = useState(initialName);
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
        <p className={styles.title}>Specify the Organization&apos;s name</p>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} onClick={() => onSave(name)}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
