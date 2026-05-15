import tailwindColors from 'tailwindcss/colors'

export interface ColorPreset {
  name: string
  hex: string
}

// Deprecated aliases and non-color entries to skip
const excluded = new Set([
  'inherit', 'current', 'transparent',
  'lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray',
])

export const tailwindPresets: ColorPreset[] = Object.entries(tailwindColors)
  .filter(([name]) => !excluded.has(name))
  .flatMap(([name, shades]) => {
    if (typeof shades === 'string') {
      // Solid colors like black/white
      if (/^#[0-9a-f]{3,8}$/i.test(shades)) {
        return [{ name, hex: shades }]
      }
      return []
    }

    return Object.entries(shades as Record<string, string>).map(([shade, hex]) => ({
      name: `${name}-${shade}`,
      hex,
    }))
  })
