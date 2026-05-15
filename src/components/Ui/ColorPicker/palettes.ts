import tailwindColors from 'tailwindcss/colors'

export interface ColorShade {
  shade: string
  value: string
}

export interface ColorFamily {
  name: string
  shades: ColorShade[]
}

const excluded = new Set([
  'inherit', 'current', 'transparent', 'white', 'black',
  'lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray',
])

export const colorFamilies: ColorFamily[] = Object.entries(tailwindColors)
  .filter(([name, shades]) => !excluded.has(name) && typeof shades === 'object')
  .map(([name, shades]) => ({
    name,
    shades: Object.entries(shades as Record<string, string>).map(([shade, value]) => ({
      shade,
      value,
    })),
  }))
