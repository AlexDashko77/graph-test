import { ReactNode } from "react";
import Header from "../Header";
import { useApp } from "@/contexts/AppContext";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { selectFunction } = useApp();

  return (
    <div className="h-screen flex z-10 flex-col bg-linear-to-br from-gray-50 to-slate-100">
      <Header onSelectFunction={selectFunction} />
      <main className="flex-1 overflow-hidden relative">{children}</main>
    </div>
  );
}
