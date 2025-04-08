"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./BusinessEntityDropdown.module.scss";

export default function BusinessEntityDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sole Proprietorship");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div
        className={styles.dropdownHeader}
        onClick={toggleDropdown}
        tabIndex={0} 
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {selected}
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          <li
            className={styles.dropdownItem}
            onClick={() => handleSelect("Sole Proprietorship")}
          >
            Sole Proprietorship
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => handleSelect("Partnership")}
          >
            Partnership
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => handleSelect("Limited Liability Company")}
          >
            Limited Liability Company
          </li>
        </ul>
      )}
    </div>
  );
}
