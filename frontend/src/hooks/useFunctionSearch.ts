import { useState, useCallback, useRef } from "react";
import { searchFunctions } from "@/lib/api";
import { debounce } from "@/lib/utils";
import { SEARCH_CONFIG } from "@/lib/constants";
import type { FunctionNode } from "@/types";
import { isValidSearchQuery } from "@/lib/validator";

export function useFunctionSearch() {
  const [functions, setFunctions] = useState<FunctionNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const search = debounce(
    async (query: string, limit = SEARCH_CONFIG.DEFAULT_LIMIT) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (!isValidSearchQuery(query, SEARCH_CONFIG.MIN_QUERY_LENGTH)) {
        setFunctions([]);
        return;
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      try {
        const result = await searchFunctions(query, limit);
        setFunctions(result.functions);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setFunctions([]);
        }
      } finally {
        setLoading(false);
      }
    },
    SEARCH_CONFIG.DEBOUNCE_MS,
  );

  const clear = useCallback(() => {
    setFunctions([]);
    setError(null);
  }, []);

  return { functions, loading, error, search, clear };
}
