"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./MultiSelectDropdown.module.scss";

export interface MultiSelectDropdownProps {
  options: string[];
  values: string[];
  onChange: (newValues: string[]) => void;
}

export default function MultiSelectDropdown({
  options,
  values,
  onChange,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayValue = values.length ? values.join(", ") : "-";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isOpen) {
      const event = new CustomEvent("dropdown:closeAll", {
        detail: { origin: containerRef.current },
      });
      window.dispatchEvent(event);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleCheckboxChange = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((val) => val !== option));
    } else {
      onChange([...values, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleCloseAll = (e: CustomEvent) => {
      if (containerRef.current && e.detail.origin !== containerRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener("dropdown:closeAll", handleCloseAll as EventListener);
    return () =>
      window.removeEventListener("dropdown:closeAll", handleCloseAll as EventListener);
  }, []);

  return (
    <div className={styles.customDropdown} ref={containerRef}>
      <button
        type="button"
        className={styles.customDropdownButton}
        onClick={handleButtonClick}
      >
        {displayValue}
        <div className={styles.arrowWrapper}>
          <Image
            src={isOpen ? "/assets/icons/chevroneUp.svg" : "/assets/icons/chevroneDown.svg"}
            alt="dropdown arrow"
            fill
            className={styles.arrow}
          />
        </div>
      </button>
      <ul className={`${styles.customDropdownList} ${isOpen ? styles.open : ""}`}>
        {options.map((option) => {
          const isChecked = values.includes(option);
          return (
            <li key={option} className={styles.multiSelectOption}>
              <label className={isChecked ? styles.checked : ""}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(option)}
                />
                <span>{option}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
