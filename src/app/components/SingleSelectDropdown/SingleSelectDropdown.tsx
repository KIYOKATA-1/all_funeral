"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./SingleSelectDropdown.module.scss";

export interface SingleSelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SingleSelectDropdown({
  options,
  value,
  onChange,
}: SingleSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayValue = value || "-";

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

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
          const isSelected = option === value;
          return (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={isSelected ? styles.selectedOption : ""}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
