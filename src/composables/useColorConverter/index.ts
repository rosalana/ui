export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'oklch'

/** Formats exposed in the ColorPicker UI — alpha is handled automatically */
export type PublicColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch'

export interface RGBA { r: number; g: number; b: number; a: number }
export interface HSVA { h: number; s: number; v: number; a: number }

// ─── Gamma ──────────────────────────────────────────────────────────────────

function linearize(c: number): number {
  const abs = Math.abs(c)
  return abs <= 0.04045
    ? c / 12.92
    : Math.sign(c) * Math.pow((abs + 0.055) / 1.055, 2.4)
}

function delinearize(c: number): number {
  const abs = Math.abs(c)
  return abs <= 0.0031308
    ? c * 12.92
    : Math.sign(c) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055)
}

// ─── HEX ────────────────────────────────────────────────────────────────────

function hexToRgba(hex: string): RGBA | null {
  const clean = hex.replace('#', '')
  let r: number, g: number, b: number, a = 1

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16)
    g = parseInt(clean[1] + clean[1], 16)
    b = parseInt(clean[2] + clean[2], 16)
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16)
    g = parseInt(clean.slice(2, 4), 16)
    b = parseInt(clean.slice(4, 6), 16)
  } else if (clean.length === 8) {
    r = parseInt(clean.slice(0, 2), 16)
    g = parseInt(clean.slice(2, 4), 16)
    b = parseInt(clean.slice(4, 6), 16)
    a = parseInt(clean.slice(6, 8), 16) / 255
  } else {
    return null
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null
  return { r, g, b, a }
}

export function rgbaToHex({ r, g, b, a }: RGBA): string {
  const ch = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0')
  const hex = `#${ch(r)}${ch(g)}${ch(b)}`
  return a >= 0.9999 ? hex : hex + ch(Math.round(a * 255))
}

// ─── RGB / RGBA ──────────────────────────────────────────────────────────────

function rgbStringToRgba(value: string): RGBA | null {
  const m = value.match(
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)/
  )
  if (!m) return null
  return {
    r: parseFloat(m[1]),
    g: parseFloat(m[2]),
    b: parseFloat(m[3]),
    a: m[4] !== undefined ? parseFloat(m[4]) : 1,
  }
}

function rgbaToRgbString({ r, g, b }: RGBA): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

function rgbaToRgbaString({ r, g, b, a }: RGBA): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${+a.toFixed(3)})`
}

// ─── HSL / HSLA ──────────────────────────────────────────────────────────────

function hslToRgba(h: number, s: number, l: number, a = 1): RGBA {
  const k = (n: number) => (n + h / 30) % 12
  const ch = s * Math.min(l, 1 - l)
  const f = (n: number) => l - ch * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
    a,
  }
}

function hslStringToRgba(value: string): RGBA | null {
  const m = value.match(
    /hsla?\(\s*(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)%[,\s]+(\d+(?:\.\d+)?)%(?:[,\s/]+(\d+(?:\.\d+)?)%?)?\s*\)/
  )
  if (!m) return null
  return hslToRgba(
    parseFloat(m[1]),
    parseFloat(m[2]) / 100,
    parseFloat(m[3]) / 100,
    m[4] !== undefined ? parseFloat(m[4]) : 1,
  )
}

function rgbaToHsl({ r, g, b }: RGBA): string {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  const l = (max + min) / 2

  if (max === min) return `hsl(0 0% ${Math.round(l * 100)}%)`

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  switch (max) {
    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
    case gn: h = ((bn - rn) / d + 2) / 6; break
    default:  h = ((rn - gn) / d + 4) / 6
  }

  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`
}

function rgbaToHsla({ r, g, b, a }: RGBA): string {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  const l = (max + min) / 2

  if (max === min) return `hsla(0, 0%, ${Math.round(l * 100)}%, ${+a.toFixed(3)})`

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  switch (max) {
    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
    case gn: h = ((bn - rn) / d + 2) / 6; break
    default:  h = ((rn - gn) / d + 4) / 6
  }

  return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${+a.toFixed(3)})`
}

// ─── oklch ──────────────────────────────────────────────────────────────────

function rgbaToOklch({ r, g, b }: RGBA): string {
  const rn = linearize(r / 255)
  const gn = linearize(g / 255)
  const bn = linearize(b / 255)

  const x = 0.4122214708 * rn + 0.5363325363 * gn + 0.0514459929 * bn
  const y = 0.2119034982 * rn + 0.6806995451 * gn + 0.1073969566 * bn
  const z = 0.0883024619 * rn + 0.2817188376 * gn + 0.6299787005 * bn

  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const bv = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  const C = Math.sqrt(a * a + bv * bv)
  let H = Math.atan2(bv, a) * (180 / Math.PI)
  if (H < 0) H += 360

  return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(2)})`
}

function rgbaToOklchFull(rgba: RGBA): string {
  const base = rgbaToOklch(rgba)
  if (rgba.a >= 1) return base
  return base.replace(')', ` / ${+rgba.a.toFixed(3)})`)
}

function oklchToRgbaCore(L: number, C: number, H: number): RGBA {
  const hRad = H * (Math.PI / 180)
  const a = C * Math.cos(hRad)
  const bv = C * Math.sin(hRad)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * bv
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bv
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bv

  const lc = l_ * l_ * l_
  const mc = m_ * m_ * m_
  const sc = s_ * s_ * s_

  const r = Math.max(0, Math.min(1, 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc))
  const g = Math.max(0, Math.min(1, -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc))
  const b = Math.max(0, Math.min(1, -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc))

  return {
    r: Math.round(delinearize(r) * 255),
    g: Math.round(delinearize(g) * 255),
    b: Math.round(delinearize(b) * 255),
    a: 1,
  }
}

function oklchStringToRgba(value: string): RGBA | null {
  // Supports: oklch(L C H) and oklch(L C H / a)
  // L and C may be percentages (Tailwind v4 uses e.g. oklch(97.1% 0.013 17.38))
  const m = value.match(
    /oklch\(\s*(\d+(?:\.\d+)?%?)\s+(\d+(?:\.\d+)?%?)\s+(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?%?))?\s*\)/
  )
  if (!m) return null
  let L = parseFloat(m[1])
  if (m[1].endsWith('%')) L /= 100
  let C = parseFloat(m[2])
  if (m[2].endsWith('%')) C = (C / 100) * 0.4
  const alpha = m[4] !== undefined
    ? (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]))
    : 1
  const core = oklchToRgbaCore(L, C, parseFloat(m[3]))
  return { ...core, a: alpha }
}

// ─── HSVA ───────────────────────────────────────────────────────────────────

export function rgbaToHsva(rgba: RGBA): HSVA {
  const r = rgba.r / 255, g = rgba.g / 255, b = rgba.b / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const delta = max - min
  const v = max * 100
  const s = max === 0 ? 0 : (delta / max) * 100

  let h = 0
  if (delta !== 0) {
    switch (max) {
      case r: h = ((g - b) / delta) % 6; break
      case g: h = (b - r) / delta + 2; break
      default: h = (r - g) / delta + 4
    }
    h = ((h / 6 + 1) % 1) * 360
  }

  return { h, s, v, a: rgba.a }
}

export function hsvaToRgba(hsva: HSVA): RGBA {
  const h = hsva.h / 360, s = hsva.s / 100, v = hsva.v / 100
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  let r: number, g: number, b: number
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    default: r = v; g = p; b = q
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsva.a,
  }
}

// ─── Parse / Format ─────────────────────────────────────────────────────────

export function parseColor(value: string): RGBA | null {
  const v = value.trim()
  if (v.startsWith('#')) return hexToRgba(v)
  if (v.startsWith('rgba')) return rgbStringToRgba(v)
  if (v.startsWith('rgb')) return rgbStringToRgba(v)
  if (v.startsWith('hsla')) return hslStringToRgba(v)
  if (v.startsWith('hsl')) return hslStringToRgba(v)
  if (v.startsWith('oklch')) return oklchStringToRgba(v)
  return null
}

export function detectFormat(value: string): ColorFormat {
  const v = value.trim()
  if (v.startsWith('#')) return 'hex'
  if (v.startsWith('rgba')) return 'rgba'
  if (v.startsWith('rgb')) return 'rgb'
  if (v.startsWith('hsla')) return 'hsla'
  if (v.startsWith('hsl')) return 'hsl'
  if (v.startsWith('oklch')) return 'oklch'
  return 'hex'
}

export function detectPublicFormat(value: string): PublicColorFormat {
  const v = value.trim()
  if (v.startsWith('#')) return 'hex'
  if (v.startsWith('rgb')) return 'rgb'
  if (v.startsWith('hsl')) return 'hsl'
  if (v.startsWith('oklch')) return 'oklch'
  return 'hex'
}

export function formatColor(rgba: RGBA, fmt: ColorFormat): string {
  switch (fmt) {
    case 'hex':   return rgbaToHex(rgba)
    case 'rgb':   return rgbaToRgbString(rgba)
    case 'rgba':  return rgbaToRgbaString(rgba)
    case 'hsl':   return rgbaToHsl(rgba)
    case 'hsla':  return rgbaToHsla(rgba)
    case 'oklch': return rgbaToOklch(rgba)
  }
}

/** Format for picker output — automatically upgrades to alpha variant when a < 1 */
export function formatPublic(rgba: RGBA, fmt: PublicColorFormat): string {
  const hasAlpha = rgba.a < 0.9999
  switch (fmt) {
    case 'hex':   return rgbaToHex(rgba)
    case 'rgb':   return hasAlpha ? rgbaToRgbaString(rgba) : rgbaToRgbString(rgba)
    case 'hsl':   return hasAlpha ? rgbaToHsla(rgba) : rgbaToHsl(rgba)
    case 'oklch': return rgbaToOklchFull(rgba)
  }
}

// ─── Composable ─────────────────────────────────────────────────────────────

export function useColorConverter() {
  return { parseColor, detectFormat, detectPublicFormat, formatColor, formatPublic, hsvaToRgba, rgbaToHsva, rgbaToHex }
}
