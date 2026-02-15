"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { FunctionNode } from "@/types";
import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  results: FunctionNode[];
  show: boolean;
  onSelect: (func: FunctionNode) => void;
  onClose: () => void; // Добавляем проп для закрытия
}

export default function SearchResults({
  results,
  show,
  onSelect,
  onClose,
}: SearchResultsProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const resultsRef = useRef<HTMLDivElement>(null);

  // Обновляем позицию при показе и скролле
  useEffect(() => {
    if (!show) return;

    const updatePosition = () => {
      const input = document.querySelector('input[type="text"]');
      if (input) {
        const rect = input.getBoundingClientRect();
        setPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isInput = target.tagName === "INPUT";
      const isResults = resultsRef.current?.contains(target);

      if (!isInput && !isResults) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  // Обработчик нажатия Escape
  useEffect(() => {
    if (!show) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show, onClose]);

  if (!show || results.length === 0) return null;

  return createPortal(
    <div
      ref={resultsRef}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: position.width,
        zIndex: 9999,
      }}
      className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto"
    >
      {results.map((func) => (
        <SearchResultItem
          key={func.id}
          func={func}
          onSelect={(func) => {
            onSelect(func);
            onClose();
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
