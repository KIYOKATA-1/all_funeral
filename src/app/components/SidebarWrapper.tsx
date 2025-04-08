"use client";

import { useSession } from "@/hooks/useSession";
import Sidebar from "./Sidebar/Sidebar";

export default function SidebarWrapper() {
  const { token } = useSession();
  return token ? <Sidebar /> : null;
}
