export type VType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "undefined"
  | "array"
  | "object"
  | "function"
  | "date"
  | "regexp"
  | "symbol"
  | "bigint"
  | "nan"
  | "infinity"
  | "circular";

export const COLOR: Record<VType, string> = {
  string: "text-emerald-400",
  number: "text-sky-400",
  boolean: "text-amber-400",
  null: "text-zinc-400",
  undefined: "text-zinc-400",
  array: "text-violet-300",
  object: "text-blue-300",
  function: "text-pink-400",
  date: "text-cyan-400",
  regexp: "text-orange-400",
  symbol: "text-purple-400",
  bigint: "text-teal-400",
  nan: "text-red-400",
  infinity: "text-red-400",
  circular: "text-red-500",
};
