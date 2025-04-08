"use client";
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

type DropdownContextType = {
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  registerRef: (id: string, ref: React.RefObject<HTMLElement>) => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [id: string]: React.RefObject<HTMLElement> }>({});

  const registerRef = (id: string, ref: React.RefObject<HTMLElement>) => {
    dropdownRefs.current[id] = ref;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!activeDropdown) return;
      const ref = dropdownRefs.current[activeDropdown];
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown, registerRef }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext must be used within a DropdownProvider");
  }
  return context;
};

