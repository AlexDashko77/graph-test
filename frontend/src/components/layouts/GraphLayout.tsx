import { ReactNode } from "react";
import NavigationControls from "../NavigationControls";
import FunctionInfo from "../function/FunctionInfo";
import { useApp } from "@/contexts/AppContext";

interface GraphLayoutProps {
  children: ReactNode;
}

export default function GraphLayout({ children }: GraphLayoutProps) {
  const { selectedFunction, navigation, goBack, goForward, showCode } =
    useApp();

  if (!selectedFunction) return null;

  return (
    <div className="relative z-0 h-full bg-white">
      <div className="absolute top-4 right-4 z-20">
        <NavigationControls
          canGoBack={navigation.canGoBack}
          canGoForward={navigation.canGoForward}
          onBack={goBack}
          onForward={goForward}
        />
      </div>

      <FunctionInfo func={selectedFunction} onShowCode={showCode} />

      {children}

      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2.5 shadow-lg z-10">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">History:</span>
            <span className="font-semibold text-gray-900">
              {navigation.currentIndex + 1}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{navigation.history.length}</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="font-mono text-xs text-gray-600 truncate max-w-50">
            {selectedFunction.package.split("/").pop()}
          </div>
        </div>
      </div>
    </div>
  );
}
