import type { ThemeMode } from "../../plugin/types";
import { createAdapter } from "../../plugin/adapter";
import { usePreferences } from "../usePreferences";
import { computed, watch } from "vue";

export function useTheme() {
  const adapter = useThemeAdapter();
  return {
    get() {
      const theme = adapter.get() as ThemeMode;
      return theme;
    },
    initializeTheme() {
      const theme = adapter.get() as ThemeMode;
      updateLocalTheme(theme as ThemeMode);
      watch(
        () => adapter.get(),
        (newTheme) => {
          updateLocalTheme(newTheme as ThemeMode);
        }
      );
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
  const sync = computed<boolean>(
    () => (usePreferences().get("syncTheme") as boolean) || false
  );

  return createAdapter<ThemeMode>({
    source: computed<ThemeMode>(() => {
      const local = localStorage.getItem("appearance") as ThemeMode | null;
      if (!sync.value) return local || "system";

      const preferences = usePreferences().get("theme") as ThemeMode | null;
      return preferences || local || "system";
    }),
    name: "theme",
    update: (value) => updateLocalTheme(value || "system"),
    sync: sync.value,
  });
};
