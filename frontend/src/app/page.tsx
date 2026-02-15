"use client";

import { useEffect, useState } from "react";
import { searchFunctions } from "@/lib/api";
import { SEARCH_CONFIG } from "@/lib/constants";
import { useApp } from "@/contexts/AppContext";
import MainLayout from "@/components/layouts/MainLayout";
import Loading from "@/components/Loading";
import GraphLayout from "@/components/layouts/GraphLayout";
import CallGraph from "@/components/graph/CallGraph";
import EmptyState from "@/components/EmptyState";
import CodeModal from "@/components/code/CodeModal";

export default function Home() {
  const { selectedFunction, selectFunction, codeModal, setSelectedFunction } =
    useApp();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function loadInitialFunction() {
      try {
        const result = await searchFunctions(SEARCH_CONFIG.INITIAL_QUERY, 1);
        if (result.functions.length > 0) {
          const initialFunc = result.functions[0];
          setSelectedFunction(initialFunc);
          selectFunction(initialFunc);
        }
      } catch (error) {
        console.error("Failed to load initial function:", error);
      } finally {
        setInitialLoading(false);
      }
    }

    loadInitialFunction();
  }, []);

  if (initialLoading) {
    return (
      <MainLayout>
        <Loading message="Loading initial graph..." size="lg" fullScreen />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {selectedFunction ? (
        <GraphLayout>
          <CallGraph
            functionNode={selectedFunction}
            onNodeClick={selectFunction}
          />
        </GraphLayout>
      ) : (
        <EmptyState />
      )}

      {selectedFunction?.file && (
        <CodeModal
          isOpen={codeModal.isOpen}
          filePath={selectedFunction.file}
          line={selectedFunction.line || 0}
          onClose={codeModal.close}
        />
      )}
    </MainLayout>
  );
}
