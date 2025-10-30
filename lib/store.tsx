"use client";

import * as React from "react";
import { DoaItem } from "./types";

type State = {
  favourites: Record<string, boolean>;
  showArabic: boolean;
  showLatin: boolean;
  showTranslate: boolean;
  showVirtues: boolean;
};

const defaultState: State = {
  favourites: {},
  showArabic: true,
  showLatin: false,
  showTranslate: false,
  showVirtues: false
};

const StoreContext = React.createContext<{
  state: State;
  toggleFav: (id: string) => void;
  toggle: (key: keyof Omit<State, "favourites">) => void;
}>({
  state: defaultState,
  toggleFav: () => { },
  toggle: () => { }
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>(() => {
    if (typeof window === "undefined") return defaultState;
    try {
      const raw = localStorage.getItem("dzikir.store");
      return raw ? JSON.parse(raw) as State : defaultState;
    } catch {
      return defaultState;
    }
  });

  React.useEffect(() => {
    localStorage.setItem("dzikir.store", JSON.stringify(state));
  }, [state]);

  function toggleFav(id: string) {
    setState(s => ({
      ...s,
      favourites: { ...s.favourites, [id]: !s.favourites[id] }
    }));
  }

  function toggle(key: keyof Omit<State, "favourites">) {
    setState(s => ({ ...s, [key]: !s[key] } as State));
  }

  return (
    <StoreContext.Provider value={{ state, toggleFav, toggle }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return React.useContext(StoreContext);
}
