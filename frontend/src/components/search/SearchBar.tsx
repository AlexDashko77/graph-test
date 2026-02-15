"use client";

import { useState } from "react";
import type { FunctionNode } from "@/types";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { useFunctionSearch } from "@/hooks/useFunctionSearch";

interface SearchBarProps {
  onSelect: (func: FunctionNode) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const { functions, loading, search } = useFunctionSearch();

  const handleChange = (value: string) => {
    setQuery(value);
    search(value);
    setShow(true);
  };

  const handleSelect = (func: FunctionNode) => {
    onSelect(func);
    setShow(false);
    setQuery("");
  };

  const handleClose = () => {
    setShow(false);
    setQuery("");
  };

  const handleFocus = () => {
    if (query.trim()) {
      setShow(true);
    }
  };

  return (
    <div className="w-full relative max-w-2xl">
      <SearchInput
        value={query}
        loading={loading}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <SearchResults
        results={functions}
        show={show}
        onSelect={handleSelect}
        onClose={handleClose}
      />
    </div>
  );
}
