"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const [panelType, setPanelType] = useState<"organizations" | "search" | null>(null);
  const [activePanelButton, setActivePanelButton] = useState<"organizations" | "contractors" | "clients" | null>("organizations");

  const router = useRouter();
  const { setToken } = useSession();

  const togglePanel = (type: "organizations" | "search") => {
    setPanelType((prev) => (prev === type ? null : type));
  };

  const handlePanelButtonClick = (button: "organizations" | "contractors" | "clients") => {
    setActivePanelButton(button);
  };

  const handleLogout = () => {
    setToken(null);
    router.push("/login");
  };

  return (
    <aside className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
        <div className={styles.topSection}>
          <div className={styles.logo}>
            <Image src="/assets/icons/sidebarLogo.svg" alt="logo" fill />
          </div>

          <nav className={styles.nav}>
            <div
              className={`${styles.navItem} ${
                panelType === "organizations" ? styles.active : ""
              }`}
              onClick={() => togglePanel("organizations")}
            >
              <div className={styles.iconWrapper}>
                <Image src="/assets/icons/Briefcase.svg" alt="briefcase" fill />
              </div>
            </div>

            <div
              className={`${styles.navItem} ${
                panelType === "search" ? styles.active : ""
              }`}
              onClick={() => togglePanel("search")}
            >
              <div className={styles.iconWrapper}>
                <Image src="/assets/icons/Search.svg" alt="search" fill />
              </div>
            </div>
          </nav>
        </div>

        <div className={styles.bottomNav}>
          <div className={styles.separator} />

          <div className={styles.navItem}>
            <div className={styles.iconWrapper}>
              <Image src="/assets/icons/Settings.svg" alt="settings" fill />
            </div>
          </div>

          <div className={styles.navItem} onClick={handleLogout}>
            <div className={styles.iconWrapper}>
              <Image src="/assets/icons/SignOut.svg" alt="logout" fill />
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className={`${styles.sidePanel} ${panelType ? styles.open : ""}`}>
        {panelType === "organizations" && (
          <div className={styles.panelContent}>
            <h2>Oak Tree Cemetery</h2>
            <p className={styles.subtitle}>Process Manager</p>
            <hr className={styles.divider} />

            <button
              className={`${styles.panelButton} ${
                activePanelButton === "organizations" ? styles.activeBtn : ""
              } ${styles.orgButton}`}
              onClick={() => handlePanelButtonClick("organizations")}
            >
              <span className={styles.panelIcon}>
                <Image src="/assets/icons/Briefcase.svg" alt="org" fill />
              </span>
              Organizations
            </button>

            <button
              className={`${styles.panelButton} ${
                activePanelButton === "contractors" ? styles.activeOutline : ""
              }`}
              onClick={() => handlePanelButtonClick("contractors")}
            >
              <span className={styles.panelIcon}>
                <Image src="/assets/icons/archive.svg" alt="contractor" fill />
              </span>
              Contractors
            </button>

            <button
              className={`${styles.panelButton} ${
                activePanelButton === "clients" ? styles.activeOutline : ""
              }`}
              onClick={() => handlePanelButtonClick("clients")}
            >
              <span className={styles.panelIcon}>
                <Image src="/assets/icons/user.svg" alt="client" fill />
              </span>
              Clients
            </button>

            <footer className={styles.footer}>
              All Funeral Services © 2015–2025
            </footer>
          </div>
        )}

        {panelType === "search" && (
          <div className={styles.panelContent}>
            <h2>Search</h2>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
