"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { FunctionNode } from "@/types";
import { useNavigationHistory } from "../hooks/useNavigationHistory";
import { useModal } from "../hooks/useModal";

interface AppContextValue {
  selectedFunction: FunctionNode | null;
  setSelectedFunction: (func: FunctionNode | null) => void;

  navigation: ReturnType<typeof useNavigationHistory>;

  codeModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };

  selectFunction: (func: FunctionNode) => void;
  goBack: () => void;
  goForward: () => void;
  showCode: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedFunction, setSelectedFunction] = useState<FunctionNode | null>(
    null,
  );
  const navigation = useNavigationHistory();
  const codeModal = useModal();

  const selectFunction = useCallback(
    (func: FunctionNode) => {
      setSelectedFunction(func);
      navigation.push(func);
      codeModal.close();
    },
    [navigation, codeModal],
  );

  const goBack = useCallback(() => {
    const prevFunc = navigation.goBack();
    if (prevFunc) {
      setSelectedFunction(prevFunc);
      codeModal.close();
    }
  }, [navigation, codeModal]);

  const goForward = useCallback(() => {
    const nextFunc = navigation.goForward();
    if (nextFunc) {
      setSelectedFunction(nextFunc);
      codeModal.close();
    }
  }, [navigation, codeModal]);

  const showCode = useCallback(() => {
    if (selectedFunction?.file) {
      codeModal.open();
    }
  }, [selectedFunction, codeModal]);

  return (
    <AppContext.Provider
      value={{
        selectedFunction,
        setSelectedFunction,
        navigation,
        codeModal,
        selectFunction,
        goBack,
        goForward,
        showCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
