/**
 * ZONA - Cell Type Enum
 * Grid hücre türleri
 */

export enum CellType {
  /**
   * Boş hücre - Player hareket edebilir, capture edilebilir
   */
  EMPTY = 0,

  /**
   * Border hücresi - Başlangıçta grid kenarları, sonra trace'den dönüştürülür
   */
  BORDER = 1,

  /**
   * Trace hücresi - Player'ın çizdiği geçici yol
   */
  TRACE = 2,

  /**
   * Claimed hücresi - Capture edilmiş alan
   */
  CLAIMED = 3,
}

/**
 * Cell type'ı stringe dönüştür (debugging için)
 */
export function cellTypeToString(type: CellType): string {
  switch (type) {
    case CellType.EMPTY:
      return 'EMPTY';
    case CellType.BORDER:
      return 'BORDER';
    case CellType.TRACE:
      return 'TRACE';
    case CellType.CLAIMED:
      return 'CLAIMED';
    default:
      return 'UNKNOWN';
  }
}

/**
 * Cell type'ı renge dönüştür (debugging/rendering için)
 */
export function cellTypeToColor(type: CellType): number {
  switch (type) {
    case CellType.EMPTY:
      return 0x000000; // Black (transparent)
    case CellType.BORDER:
      return 0x00d9ff; // Cyan
    case CellType.TRACE:
      return 0xffbe0b; // Yellow
    case CellType.CLAIMED:
      return 0x7b2cbf; // Purple
    default:
      return 0xffffff; // White
  }
}

