/**
 * ZONA - Point Utility
 * 2D nokta/konum için temel veri yapısı
 */

/**
 * Grid koordinatı (integer)
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * İki noktanın eşit olup olmadığını kontrol et
 */
export function pointEquals(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

/**
 * Point'i stringe dönüştür (key olarak kullanım için)
 */
export function pointToKey(p: Point): string {
  return `${p.x},${p.y}`;
}

/**
 * Key'den point'e dönüştür
 */
export function keyToPoint(key: string): Point {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
}

/**
 * İki nokta arası Manhattan distance
 */
export function manhattanDistance(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * İki nokta arası Euclidean distance
 */
export function euclideanDistance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Point'in grid sınırları içinde olup olmadığını kontrol et
 */
export function isPointInBounds(p: Point, width: number, height: number): boolean {
  return p.x >= 0 && p.x < width && p.y >= 0 && p.y < height;
}

/**
 * 4 yönlü komşuları al (up, right, down, left)
 */
export function getFourNeighbors(p: Point): Point[] {
  return [
    { x: p.x, y: p.y - 1 },     // Up
    { x: p.x + 1, y: p.y },     // Right
    { x: p.x, y: p.y + 1 },     // Down
    { x: p.x - 1, y: p.y },     // Left
  ];
}

/**
 * 8 yönlü komşuları al (4-directional + diagonals)
 */
export function getEightNeighbors(p: Point): Point[] {
  return [
    { x: p.x, y: p.y - 1 },     // Up
    { x: p.x + 1, y: p.y - 1 }, // Up-Right
    { x: p.x + 1, y: p.y },     // Right
    { x: p.x + 1, y: p.y + 1 }, // Down-Right
    { x: p.x, y: p.y + 1 },     // Down
    { x: p.x - 1, y: p.y + 1 }, // Down-Left
    { x: p.x - 1, y: p.y },     // Left
    { x: p.x - 1, y: p.y - 1 }, // Up-Left
  ];
}

/**
 * Bresenham line algorithm - İki nokta arası tüm grid cell'leri
 */
export function getLinePoints(from: Point, to: Point): Point[] {
  const points: Point[] = [];
  
  let x0 = from.x;
  let y0 = from.y;
  const x1 = to.x;
  const y1 = to.y;
  
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  
  while (true) {
    points.push({ x: x0, y: y0 });
    
    if (x0 === x1 && y0 === y1) break;
    
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  
  return points;
}

/**
 * Point array'i clone et
 */
export function clonePoints(points: Point[]): Point[] {
  return points.map(p => ({ x: p.x, y: p.y }));
}

