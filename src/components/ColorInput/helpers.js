export const hexToRgba = (hex = '') => {
   hex = hex.replace(/^#/, '');
   if (hex.length === 3 || hex.length === 4) {
      hex = hex
         .split('')
         .map(char => char + char)
         .join('');
   }
   const hasAlpha = hex.length === 8;
   const r = parseInt(hex.slice(0, 2), 16);
   const g = parseInt(hex.slice(2, 4), 16);
   const b = parseInt(hex.slice(4, 6), 16);
   const a = (hasAlpha ? parseInt(hex.slice(6, 8), 16) / 255 : 1).toFixed(3);
   const rgbaFormat = { r, g, b, a };
   return rgbaFormat;
};
export const rgbaToHex = ({ r = 0, g = 0, b = 0, a = 1 }) => {
   const toHex = value => {
      const hex = Math.round(value).toString(16).padStart(2, '0');
      return hex;
   };
   const newAlpha = isNaN(a) ? 1 : a;
   const alpha = toHex(newAlpha * 255);
   const hexFormat = `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
   return hexFormat;
};
export const hslaToHex = ({ h = 0, s = 0, l = 0, a = 1 }) => {
   s /= 100;
   l /= 100;
   const k = n => (n + h / 30) % 12;
   const aVal = s * Math.min(l, 1 - l);
   const f = n => {
      const color =
         l - aVal * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return Math.round(255 * color);
   };
   const toHex = v => v.toString(16).padStart(2, '0');
   const r = f(0);
   const g = f(8);
   const b = f(4);
   const alpha = Math.round(a * 255);
   const hexFormat =
      '#' + toHex(r) + toHex(g) + toHex(b) + (a < 1 ? toHex(alpha) : '');
   return hexFormat;
};
export const hsvaToHex = ({ h = 0, s = 0, v = 0, a = 1 }) => {
   s /= 100;
   v /= 100;
   const c = v * s;
   const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
   const m = v - c;
   let r1, g1, b1;
   if (h < 60) [r1, g1, b1] = [c, x, 0];
   else if (h < 120) [r1, g1, b1] = [x, c, 0];
   else if (h < 180) [r1, g1, b1] = [0, c, x];
   else if (h < 240) [r1, g1, b1] = [0, x, c];
   else if (h < 300) [r1, g1, b1] = [x, 0, c];
   else [r1, g1, b1] = [c, 0, x];
   const r = Math.round((r1 + m) * 255);
   const g = Math.round((g1 + m) * 255);
   const b = Math.round((b1 + m) * 255);
   const alpha = Math.round(a * 255);
   const toHex = v => v.toString(16).padStart(2, '0');
   const hexFormat =
      '#' + toHex(r) + toHex(g) + toHex(b) + (a < 1 ? toHex(alpha) : '');
   return hexFormat;
};
