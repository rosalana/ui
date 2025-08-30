import type { ThemeMode } from "../plugin/types";
import { createAdapter } from "../plugin/adapter";
import { usePreferences } from "./usePreferences";
import { useAppContext } from "../plugin";

export function useTheme() {
  const adapter = useThemeAdapter();
  return {
    get() {
      const theme = adapter.get() as ThemeMode;
      return theme;
    },
    initializeTheme() {
      const theme = adapter.get() as ThemeMode;
      updateLocalTheme(theme);
    },
    async update(value: ThemeMode) {
      return adapter.update(value);
    },
    isDark() {
      const theme = adapter.get() as ThemeMode;
      return (
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    },
  };
}

const updateLocalTheme = (value: ThemeMode) => {
  if (["light", "dark", "system"].indexOf(value) === -1) {
    value = "system";
  }

  if (value === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    document.documentElement.classList.toggle("dark", systemTheme === "dark");
  } else {
    document.documentElement.classList.toggle("dark", value === "dark");
  }

  localStorage.setItem("appearance", value);
  return value;
};

const useThemeAdapter = () => {
console.log('useThemeAdapter');
 return createAdapter<ThemeMode>({
    source: () => {
      const currentTheme = localStorage.getItem(
        "appearance"
      ) as ThemeMode | null;
      console.log('useTheme',usePreferences().get("theme"));
      console.log('useTheme', useAppContext().preferences);
      const savedTheme = usePreferences().get("theme") as ThemeMode | null;
      return savedTheme || currentTheme || "system";
    },
    name: "theme",
    update: (value) => updateLocalTheme(value || "system"),
    sync: false,
  });
}
