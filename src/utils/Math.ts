/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Clamp değer min ve max arasında tutar
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * İki nokta arası mesafe hesaplar
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Derece → Radian dönüşümü
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Radian → Derece dönüşümü
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Random sayı (min-max arası)
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

