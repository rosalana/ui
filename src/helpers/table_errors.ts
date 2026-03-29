export const TableErrors = {
  column: {
    noSearchable: [
      "%c[Table Warning]: No searchable columns are defined.\n\n" +
        "%cFallback: All rows will be displayed without filtering.",
      "font-weight: bold; color: orange;",
      "",
    ],
  },
  row: {
    invalidTypeKey: [
      "%c[Table Warning]: The provided key in Config.Options.Key is not a string or number.\n\n" +
        "%cFallback: Using a hashed row identifier instead.",
      "font-weight: bold; color: orange;",
      "",
    ],
    notUniqueKey: [
      "%c[Table Warning]: The provided key in Config.Options.Key is not unique.\n\n" +
        "%cFallback: Using a hashed row identifier instead.",
      "font-weight: bold; color: orange;",
      "",
    ],
    notDefinedKey: [
      "%c[Table Warning]: Config.Options.Key is not defined.\n\n" +
        "%cFallback: Using a hashed row identifier instead.",
      "font-weight: bold; color: orange;",
      "",
    ],
  },
  render: {
    invalidType: {
      object: [
        "%c[Table Warning]: Attempted to render an object as a string.\n\n" +
          "%cRendering objects directly is not supported. Use the render() function to define custom rendering logic.\n\n" +
          "%cNote: Rendering is separate from data representation.\n\n" +
          "%cTip: %cConsider using the render() function to handle object rendering.\n\n Details:",
        "font-weight: bold; color: orange;",
        "",
        "font-style: italic;",
        "font-weight: bold; color: black;",
        "",
      ],
      null: [
        "%c[Table Warning]: Attempted to render a null or undefined value as a string.\n\n" +
          "%cNullable values in your data should be handled explicitly for better user experience.\n\n" +
          "%cNote: Rendering is separate from data representation.\n\n" +
          "%cTip: %cConsider handling null or undefined values in your render logic.\n\n Details:",
        "font-weight: bold; color: orange;",
        "",
        "font-style: italic;",
        "font-weight: bold; color: black;",
        "",
      ],
    },
  },
};
