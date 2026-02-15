import { useState, useEffect } from "react";
import { getSourceCode } from "@/lib/api";
import type { UseAsyncResult } from "@/types";

interface SourceCodeData {
  content: string;
  language: string;
}

export function useSourceCode(
  filePath: string | null,
): UseAsyncResult<SourceCodeData> {
  const [source, setSource] = useState<SourceCodeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filePath) {
      setSource(null);
      return;
    }

    let cancelled = false;

    async function fetchSource() {
      setLoading(true);
      setError(null);

      try {
        const data = await getSourceCode(filePath || "");
        if (!cancelled) {
          setSource({
            content: data.content,
            language: data.language,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load source code",
          );
          setSource(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSource();
    return () => {
      cancelled = true;
    };
  }, [filePath]);

  return { data: source, loading, error };
}
