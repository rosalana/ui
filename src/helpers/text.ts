export function initials(name: string) {
  return name
    .split(/[.:\-_ ]/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function label(
  text: string,
  excludeList: string[] = [],
  ignoreList: string[] = [],
) {
  // always lowercase words
  const exclude: string[] = [
    "to",
    "and",
    "or",
    "of",
    "from",
    "with",
    "by",
    "in",
    "at",
    "for",
    "on",
    "off",
    "over",
    "under",
    "between",
    "among",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "around",
    "near",
    "beyond",
    "within",
    "without",
    "against",
    "towards",
    "upon",
    "about",
    "across",
    "behind",
    "beside",
    "beneath",
    "into",
    "onto",
    "out",
    "up",
    "down",
    "off",
    "along",
    "past",
    "since",
    "until",
    "via",
    "a",
    "the",
    "an",
    "some",
    "any",
  ];

  if (excludeList.length > 0) {
    exclude.push(...excludeList);
  }

  // uplne ignorované slova
  const ignore: string[] = [];

  if (ignoreList.length > 0) {
    ignore.push(...ignoreList);
  }

  // emails are truncated to name only
  if (text.includes("@")) {
    const [name, domain] = text.split("@");
    text = name;
  }

  return text
    .replace(/[-._]/g, " ")
    .split(" ")
    .map((word, index, words) =>
      ignore.includes(word)
        ? word
        : exclude.includes(word.toLowerCase()) &&
            index !== 0 &&
            index !== words.length - 1
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
}

export function file_size(size: number, decimals: number = 2) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(decimals)} ${units[unitIndex]}`;
}
