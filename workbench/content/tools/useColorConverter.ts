import { section, type Article } from "../schema";

export default {
  title: "useColorConverter",
  description: "Parse and convert HEX, RGB, HSL, OKLCH and HSV colors.",
  sections: [
    section(
      "usage",
      "Usage",
      "parseColor reads a color string in any supported format and returns an RGBA object (r, g, b in 0-255, a in 0-1), or null when it can't read it. Always check the result before converting. formatColor turns an RGBA into a string of a format.",
      `import { useColorConverter } from '@rosalana/ui';

const { parseColor, formatColor, rgbaToHsva } = useColorConverter();
const color = parseColor('#3b82f6');

if (color) {
  const hsl = formatColor(color, 'hsl');
  const hsv = rgbaToHsva(color);
}`,
    ),
    section(
      "formats",
      "Formats",
      "detectFormat and formatColor know hex, rgb, rgba, hsl, hsla and oklch, including the alpha-specific rgba and hsla. detectPublicFormat and formatPublic work with hex, rgb, hsl and oklch only and handle alpha by themselves, which is what the color picker offers. rgbaToHsva and hsvaToRgba convert to and from HSV, and rgbaToHex to a hex string; the channel ranges are described by the exported RGBA and HSVA types.",
    ),
  ],
  examples: [
    {
      file: "Convert",
      title: "Convert a team color",
      description:
        "Type a color in any format: it is validated with parseColor and shown in every public format.",
    },
    {
      file: "Hsva",
      title: "Work in HSV",
      description:
        "Rotate the hue through rgbaToHsva and hsvaToRgba, like a color picker does.",
    },
  ],
} satisfies Article;
