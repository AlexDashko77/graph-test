import { useState, useCallback } from "react";
import type { FunctionNode } from "@/types";

export function useNavigationHistory() {
  const [history, setHistory] = useState<FunctionNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const push = useCallback(
    (func: FunctionNode) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        return [...newHistory, func];
      });
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex],
  );

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) {
      setCurrentIndex((prev) => prev - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [canGoBack, currentIndex, history]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      setCurrentIndex((prev) => prev + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [canGoForward, currentIndex, history]);

  return {
    history,
    currentIndex,
    push,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
  };
}
