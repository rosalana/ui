import { GradientColor } from "./types";

export function hsl(h: number, s: number, l: number): GradientColor {
  return clampHsl({ h, s: s / 100, l: l / 100 });
}

export function toRgb(color: GradientColor): [number, number, number] {
  const { h, s, l } = clampHsl(color);

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));

  let r1 = 0,
    g1 = 0,
    b1 = 0;

  if (hh >= 0 && hh < 1) [r1, g1, b1] = [c, x, 0];
  else if (hh >= 1 && hh < 2) [r1, g1, b1] = [x, c, 0];
  else if (hh >= 2 && hh < 3) [r1, g1, b1] = [0, c, x];
  else if (hh >= 3 && hh < 4) [r1, g1, b1] = [0, x, c];
  else if (hh >= 4 && hh < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const m = l - c / 2;
  return [r1 + m, g1 + m, b1 + m];
}

export function getCanvasDimensions(canvas: HTMLCanvasElement) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const cssW = canvas.clientWidth || canvas.width || 1;
  const cssH = canvas.clientHeight || canvas.height || 1;

  const w = Math.max(1, Math.floor(cssW * dpr));
  const h = Math.max(1, Math.floor(cssH * dpr));

  return { w, h, dpr };
}

export function _call<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => TResult | Promise<TResult>,
  catcher?: (error: Error) => void,
) {
  return (...args: TArgs) => {
    try {
      const res = fn(...args);
      if (res instanceof Promise) {
        return res.catch((err) => {
          if (catcher && err instanceof Error) catcher(err);
          else throw err;
          // když catcher existuje, nechci ticho -> pořád throw je často lepší
          throw err;
        }) as any;
      }
      return res as any;
    } catch (err) {
      if (catcher && err instanceof Error) catcher(err);
      else throw err;
      throw err;
    }
  };
}

function clampHsl(color: GradientColor): GradientColor {
  return {
    h: ((color.h % 360) + 360) % 360,
    s: Math.max(0, Math.min(1, color.s)),
    l: Math.max(0, Math.min(1, color.l)),
  };
}
