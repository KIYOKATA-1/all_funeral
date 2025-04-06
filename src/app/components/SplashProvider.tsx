'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
      if (pathname === '/') {
        router.push('/login');
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pathname, router]);

  if (showSplash) {
    return (
      <div
        style={{
          opacity: 1,
          transition: 'opacity 0.5s ease',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/assets/image/logo.svg" alt="logo" width={100} height={100} />
      </div>
    );
  }

  return <>{children}</>;
}
