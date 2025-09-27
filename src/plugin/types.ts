import { ComputedRef, Ref } from "vue";

export type ThemeMode = "light" | "dark" | "system";

export type Environment =
  | "developement"
  | "production"
  | "maintenance"
  | "staging";

export type Adapter<T> = {
  get: (key?: keyof T) => T | T[keyof T] | null;
  update: (value: Partial<T>) => Promise<T>;
};

export type ValueOrFn<T> = T | (() => T);

export type CreateAdapterOptions<T> = {
  source: ValueOrFn<Ref<T> | ComputedRef<T>>;
  name: string;
  update?: (value: Partial<T>) => Promise<T> | T; // run before updating the context
  sync?: boolean; // if true, run update function in config
};

export type Preferences = {
  theme?: ThemeMode;
  locale?: string;
  syncTheme?: boolean;
};

export type Permissions = Record<string, boolean>;

export type User = {
  id: number | string;
  name: string;
  email: string;
  [key: string]: any;
};

export type TailwindColorName =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export type TailwindShadeLevel =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type UiColorPalette = {
  name: TailwindColorName | string;
  shades: Record<TailwindShadeLevel, string> | string;
  default: UiColorProp;
} & {
  [key: string]: UiColorProp;
};

export type UiColorProp = {
  light: keyof UiColorPalette["shades"] | string;
  dark: keyof UiColorPalette["shades"] | string;
};

type ColorProperty = {
  /**
   * Name of the color from Tailwind palette or custom defined
   * e.g. `red`, `blue`, `slate`,..., `customColorName`
   */
  color: TailwindColorName | string;
  /**
   * Default shade for light and dark mode (default is `500`)
   * e.g. `200 dark:900`
   * or use directly different palette
   * e.g. `red-500 dark:800` -> light mode use `red-500` and dark mode `customColorName-800`
   */
  default?: string;
};

export type ColorsConfig = {
  white?: string;
  black?: string;
  theme?: ColorProperty & {
    background?: string; // otázka jestli toto spojovat s colorProperty a neudělat to zvlášť
    foreground?: string;
    border?: string;
    input?: string;
    ring?: string;
  };
  primary?: ColorProperty;
  secondary?: ColorProperty;
  muted?: ColorProperty;
  destructive?: ColorProperty;
  info?: ColorProperty;
  success?: ColorProperty;
  warning?: ColorProperty;
  //... more colors here later
}

export type CreateRosalanaUIOptions = {
  /** Application name */
  name?: string;
  /** Application environment */
  env?: Environment;
  // theme?: ThemeMode; // removed [NOT USING PROBABLY] -> mohlo by to být používané v useTheme ale tam je fallback na system a to asi stačí 
  /** Configuration for colors used in the UI */
  colors?: ColorsConfig;
  // motion?: {
  //   reduce?: boolean;
  //   disable?: boolean;
  //   timeline?: {
  //     slow?: number;
  //     normal?: number;
  //     fast?: number;
  //   };
  // };
  /** Runs after the app is created and all providers are set */
  after?: () => void;
  /** Runs before building the context */
  before?: () => void;
  /** Adapters to connect Rosalana UI with your backend */
  adapters?: {
    preferences?: Adapter<Preferences>["update"];
  } & Record<string, Adapter<any>["update"]>;
};

export type RosalanaUIContext = CreateRosalanaUIOptions & {
  preferences: Preferences | null;
  user: User | null;
  permissions: Permissions | null;
} & Record<string, any>; // to allow dynamic properties like `cart`, `notifications`
