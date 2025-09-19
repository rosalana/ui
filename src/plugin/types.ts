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
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

export type UiColorPalette = {
  name: TailwindColorName | string; // 'blue' nebo custom
  shades: Record<TailwindShadeLevel, string> | string;
};

export type UiColorSlot = {
  color: UiColorPalette; // základní paleta
  light?: keyof UiColorPalette["shades"] | string; // default 500
  dark?: keyof UiColorPalette["shades"] | string; // default 500
};

export type CreateRosalanaUIOptions = {
  name?: string;
  env?: Environment;
  theme?: ThemeMode;
  colors?: {
    white?: string;
    black?: string;
    theme?: string; // -> z toho bude odvozena barva pozadí a další
    // --
    primary?: string; // musí být jako UiColorSlot aby bylo možné přesně definovat která je ta primary barva z toho spektra
    //... add more colors here later
  };
  motion?: {
    reduce?: boolean;
    disable?: boolean;
    timeline?: {
      slow?: number;
      normal?: number;
      fast?: number;
    };
  };
  after?: () => void;
  before?: () => void;
  adapters?: {
    preferences?: Adapter<Preferences>["update"];
  } & Record<string, Adapter<any>["update"]>;
};

export type RosalanaUIContext = CreateRosalanaUIOptions & {
  preferences: Preferences | null;
  user: User | null;
  permissions: Permissions | null;
} & Record<string, any>; // to allow dynamic properties like `cart`, `notifications`
