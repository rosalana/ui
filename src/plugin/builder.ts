import { CreateRosalanaUIOptions, RosalanaUIContext } from "./types";

export default function buildContext(config: CreateRosalanaUIOptions) {
  const builders = [
    name,
    env,
    theme,
    colors,
    motion,
    adapters,
    preferences,
    user,
    permissions,
  ];

  const build = (fn: (config: CreateRosalanaUIOptions) => any) => fn(config);

  return builders.reduce((acc, fn) => {
    const result = build(fn);
    return { ...acc, [fn.name]: result };
  }, {} as RosalanaUIContext);
}

function name(config: CreateRosalanaUIOptions): RosalanaUIContext["name"] {
  return (import.meta as any)?.env?.APP_NAME || "Rosalana";
}

function env(config: CreateRosalanaUIOptions): RosalanaUIContext["env"] {
  return ((import.meta as any)?.env?.APP_ENV ||
    "production") as RosalanaUIContext["env"];
}

function theme(config: CreateRosalanaUIOptions): RosalanaUIContext["theme"] {
  return config.theme || "system";
}

function colors(config: CreateRosalanaUIOptions): RosalanaUIContext["colors"] {
  const defaults: RosalanaUIContext["colors"] = {
    primary: "#3b82f6", // default blue-500
  };

  return { ...defaults, ...config.colors };
}

function motion(config: CreateRosalanaUIOptions): RosalanaUIContext["motion"] {
  const defaults: RosalanaUIContext["motion"] = {
    reduce: false,
    disable: false,
    timeline: {
      slow: 1000,
      normal: 500,
      fast: 250,
    },
  };

  return { ...defaults, ...config.motion };
}

function adapters(
  config: CreateRosalanaUIOptions
): RosalanaUIContext["adapters"] {
  return config.adapters || {};
}

function preferences(
  config: CreateRosalanaUIOptions
): RosalanaUIContext["preferences"] {
  return null;
}

function user(config: CreateRosalanaUIOptions): RosalanaUIContext["user"] {
  return null;
}

function permissions(
  config: CreateRosalanaUIOptions
): RosalanaUIContext["permissions"] {
  return null;
}

// sem přidat funkce pro nastaveni defaultu configu pro každou položku zvlášť
