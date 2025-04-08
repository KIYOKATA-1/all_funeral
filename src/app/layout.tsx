"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import SplashProvider from "./components/SplashProvider";
import SessionProvider from "@/context/SessionProvider";
import SidebarWrapper from "./components/SidebarWrapper";
import { useSession } from "@/hooks/useSession";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function ConditionalSidebar() {
  const { token } = useSession();
  const pathname = usePathname();

  if (!token || pathname === "/login") {
    return null;
  }
  return <SidebarWrapper />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <SessionProvider>
          <SplashProvider>
            <div style={{ display: "flex", minHeight: "100vh" }}>
              <ConditionalSidebar />
              <main style={{ flexGrow: 1 }} className="main-content">
                {children}
              </main>
            </div>
          </SplashProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
