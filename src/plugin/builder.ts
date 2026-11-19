import { mergeConfigColors } from "./colors";
import { normalizeLocale } from "../helpers/locale";
import { CreateRosalanaUIOptions, RosalanaUIContext } from "./types";

export default function buildContext(config: CreateRosalanaUIOptions) {
  const builders: Record<string, (config: CreateRosalanaUIOptions) => any> = {
    name,
    env,
    colors,
    locale,
    messages,
    timeZone,
    // motion,
    adapters,
    preferences,
    user,
    permissions,
    after,
  };

  const context = {} as RosalanaUIContext;

  context.before = before(config);
  context.before?.();

  for (const key in builders) {
    context[key as keyof RosalanaUIContext] = builders[key](config);
  }

  return context;
}

function name(config: CreateRosalanaUIOptions): RosalanaUIContext["name"] {
  return config.name || "Rosalana";
}

function env(config: CreateRosalanaUIOptions): RosalanaUIContext["env"] {
  return config.env || "production";
}

function colors(config: CreateRosalanaUIOptions): RosalanaUIContext["colors"] {
  return mergeConfigColors(config.colors);
}

function locale(config: CreateRosalanaUIOptions): RosalanaUIContext["locale"] {
  return normalizeLocale(config.locale);
}

function messages(config: CreateRosalanaUIOptions): RosalanaUIContext["messages"] {
  return config.messages || {};
}

function timeZone(config: CreateRosalanaUIOptions): RosalanaUIContext["timeZone"] {
  return config.timeZone || null;
}

// function motion(config: CreateRosalanaUIOptions): RosalanaUIContext["motion"] {
//   const defaults: RosalanaUIContext["motion"] = {
//     reduce: false,
//     disable: false,
//     timeline: {
//       slow: 1000,
//       normal: 500,
//       fast: 250,
//     },
//   };

//   return { ...defaults, ...config.motion };
// }

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

function after(config: CreateRosalanaUIOptions): RosalanaUIContext["after"] {
  return config.after || (() => {});
}

function before(config: CreateRosalanaUIOptions): RosalanaUIContext["before"] {
  return config.before || (() => {});
}
