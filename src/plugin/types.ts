export type ThemeMode = "light" | "dark" | "system";
export type Environment = "local" | "production" | "maintenance" | "staging";

export type Adapter<T> = {
  get: (key?: keyof T) => T | T[keyof T] | null
  update: (value: Partial<T>) => Promise<T>
}

export type CreateAdapterOptions<T> = {
  source: () => T | null
  name: string
};

export type Preferences = {
  theme?: ThemeMode;
  locale?: string;
};

export type Permissions = Record<string, boolean>;

export type User = {
  id: number | string;
  name: string;
  email: string;
  [key: string]: any;
};

export type CreateRosalanaUIOptions = {
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
  adapters?: {
    preferences?: Adapter<Preferences>["update"];
  } & Record<string, Adapter<any>["update"]>;
};

export type RosalanaUIContext = CreateRosalanaUIOptions & {
  name: string;
  env: Environment;
  preferences: Preferences | null;
  user: User | null;
  permissions: Permissions | null;
} & Record<string, any>; // to allow dynamic properties like `cart`, `notifications`
