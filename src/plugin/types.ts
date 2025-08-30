import { ComputedRef, Ref } from "vue";

export type ThemeMode = "light" | "dark" | "system";

export type Environment = "developement" | "production" | "maintenance" | "staging";

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

export type CreateRosalanaUIOptions = {
  name?: string;
  env?: Environment;
  theme?: ThemeMode;
  colors?: {
    primary?: string;
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
  adapters?: {
    preferences?: Adapter<Preferences>["update"];
  } & Record<string, Adapter<any>["update"]>;
};

export type RosalanaUIContext = CreateRosalanaUIOptions & {
  preferences: Preferences | null;
  user: User | null;
  permissions: Permissions | null;
} & Record<string, any>; // to allow dynamic properties like `cart`, `notifications`
