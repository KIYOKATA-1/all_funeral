'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './SplashProvider.module.scss';

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    const removeSplashTimeout = setTimeout(() => {
      setShowSplash(false);
      if (pathname === '/') {
        router.push('/login');
      }
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(removeSplashTimeout);
    };
  }, [pathname, router]);

  if (showSplash) {
    return (
      <div
        className={`${styles.splashWrapper} ${!visible ? styles.fadeOut : ''}`}
      >
        <Image src="/assets/image/logo.svg" alt="logo" width={100} height={100} />
      </div>
    );
  }

  return <>{children}</>;
}
