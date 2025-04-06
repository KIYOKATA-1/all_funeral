'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(prev => !prev);
  };

  return (
    <aside className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <Image src="public/assets/icons/sidebarLogo.svg" alt="logo" fill />
        </div>

        <nav className={styles.nav}>
          <div
            className={`${styles.navItem} ${isPanelOpen ? styles.active : ''}`}
            onClick={togglePanel}
          >
            <div className={styles.iconWrapper}>
              <Image src="/assets/icons/Briefcase.svg" alt="briefcase" fill />
            </div>
          </div>
        </nav>
      </div>

      <div className={`${styles.sidePanel} ${isPanelOpen ? styles.open : ''}`}>
        <h3>Панель</h3>
        <p>Контент выдвигающейся панели</p>
      </div>
    </aside>
  );
}
