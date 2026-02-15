"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-go";
import "prismjs/themes/prism-tomorrow.css";
import { useSourceCode } from "@/hooks/useSourceCode";

interface CodeViewerProps {
  filePath: string;
  highlightLine: number;
}

export default function CodeViewer({
  filePath,
  highlightLine,
}: CodeViewerProps) {
  const { data, loading, error } = useSourceCode(filePath);

  useEffect(() => {
    if (data && !loading) {
      Prism.highlightAll();

      const lineElement = document.getElementById(`line-${highlightLine}`);
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [data, loading, highlightLine]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-gray-600 text-sm">Loading source...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50">
        <p className="text-red-600">{error || "Failed to load source"}</p>
      </div>
    );
  }

  const lines = data.content.split("\n");

  return (
    <div className="h-full overflow-auto bg-gray-900">
      <div className="p-4">
        <pre className="language-go">
          <code className="language-go">
            {lines.map((line, idx) => (
              <div
                key={idx}
                id={`line-${idx + 1}`}
                className={highlightLine === idx + 1 ? "bg-yellow-900/30" : ""}
              >
                <span className="inline-block w-12 text-right pr-4 text-gray-500 select-none">
                  {idx + 1}
                </span>
                {line}
                {"\n"}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
