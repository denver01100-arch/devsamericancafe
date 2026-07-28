"use client";

import { createContext, useContext, useMemo, useState } from "react";

type IntroState = {
  ready: boolean;
  finish: () => void;
};

const IntroContext = createContext<IntroState>({ ready: true, finish: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const value = useMemo<IntroState>(
    () => ({ ready, finish: () => setReady(true) }),
    [ready]
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}
