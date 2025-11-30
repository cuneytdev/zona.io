/**
 * ZONA - Grid System
 * Pixi-independent 2D grid structure
 * 
 * Responsibilities:
 * - Grid data management (2D array)
 * - Cell type operations (get/set)
 * - Flood fill algorithm
 * - Area detection and capture
 * - Statistics (captured %, total cells)
 */

import { CellType } from './CellType';
import { 
  Point, 
  pointToKey, 
  pointEquals,
  isPointInBounds, 
  getFourNeighbors 
} from './Point';

/**
 * Flood fill sonucu - bir alan
 */
export interface Area {
  cells: Point[];          // Bu alandaki tüm hücreler
  size: number;            // Hücre sayısı
  hasEnemy?: boolean;      // Bu alanda düşman var mı? (opsiyonel)
}

/**
 * Grid istatistikleri
 */
export interface GridStats {
  totalCells: number;      // Toplam hücre sayısı
  emptyCells: number;      // Boş hücre sayısı
  borderCells: number;     // Border hücre sayısı
  traceCells: number;      // Trace hücre sayısı
  claimedCells: number;    // Claimed hücre sayısı
  claimedPercentage: number; // Claimed yüzdesi
}

/**
 * Ana Grid sınıfı
 */
export class Grid {
  private readonly width: number;
  private readonly height: number;
  private readonly cellSize: number;
  private grid: CellType[][];

  constructor(width: number, height: number, cellSize: number = 20) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    
    // Initialize empty grid
    this.grid = this.createEmptyGrid();
    
    // Initialize borders (edges)
    this.initializeBorders();
    
    console.log(`📐 Grid created: ${width}x${height} cells (cell size: ${cellSize}px)`);
  }

  /**
   * Create empty 2D array
   */
  private createEmptyGrid(): CellType[][] {
    const grid: CellType[][] = [];
    
    for (let y = 0; y < this.height; y++) {
      grid[y] = [];
      for (let x = 0; x < this.width; x++) {
        grid[y][x] = CellType.EMPTY;
      }
    }
    
    return grid;
  }

  /**
   * Initialize border cells (grid edges)
   */
  private initializeBorders(): void {
    for (let x = 0; x < this.width; x++) {
      this.grid[0][x] = CellType.BORDER;                // Top edge
      this.grid[this.height - 1][x] = CellType.BORDER;  // Bottom edge
    }
    
    for (let y = 0; y < this.height; y++) {
      this.grid[y][0] = CellType.BORDER;                // Left edge
      this.grid[y][this.width - 1] = CellType.BORDER;   // Right edge
    }
  }

  /**
   * Get cell type at position
   */
  public getCellType(x: number, y: number): CellType;
  public getCellType(point: Point): CellType;
  public getCellType(xOrPoint: number | Point, y?: number): CellType {
    const point = typeof xOrPoint === 'number' 
      ? { x: xOrPoint, y: y! }
      : xOrPoint;
    
    if (!isPointInBounds(point, this.width, this.height)) {
      return CellType.BORDER; // Out of bounds = treat as border
    }
    
    return this.grid[point.y][point.x];
  }

  /**
   * Set cell type at position
   */
  public setCellType(x: number, y: number, type: CellType): void;
  public setCellType(point: Point, type: CellType): void;
  public setCellType(xOrPoint: number | Point, typeOrY: CellType | number, type?: CellType): void {
    const point = typeof xOrPoint === 'number'
      ? { x: xOrPoint, y: typeOrY as number }
      : xOrPoint;
    const cellType = typeof xOrPoint === 'number' ? type! : typeOrY as CellType;
    
    if (!isPointInBounds(point, this.width, this.height)) {
      return; // Ignore out of bounds
    }
    
    this.grid[point.y][point.x] = cellType;
  }

  /**
   * Reset grid to initial state
   */
  public reset(): void {
    this.grid = this.createEmptyGrid();
    this.initializeBorders();
    console.log('🔄 Grid reset');
  }

  /**
   * Convert trace to border
   */
  public convertTraceToBorder(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x] === CellType.TRACE) {
          this.grid[y][x] = CellType.BORDER;
        }
      }
    }
  }

  /**
   * Clear all trace cells
   */
  public clearTrace(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x] === CellType.TRACE) {
          this.grid[y][x] = CellType.EMPTY;
        }
      }
    }
  }

  /**
   * Find all separate empty areas (flood fill)
   * Returns array of areas
   */
  public findEmptyAreas(): Area[] {
    const visited = new Set<string>();
    const areas: Area[] = [];
    
    // Scan entire grid for unvisited empty cells
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const point = { x, y };
        const key = pointToKey(point);
        
        if (!visited.has(key) && this.grid[y][x] === CellType.EMPTY) {
          // Found new area, flood fill it
          const area = this.floodFill(point, visited);
          
          if (area.cells.length > 0) {
            areas.push(area);
          }
        }
      }
    }
    
    return areas;
  }

  /**
   * Flood fill from a starting point (BFS)
   * Returns all connected empty cells
   */
  public floodFill(startPoint: Point, visited?: Set<string>): Area {
    const visitedSet = visited || new Set<string>();
    const cells: Point[] = [];
    const queue: Point[] = [startPoint];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = pointToKey(current);
      
      // Skip if already visited
      if (visitedSet.has(key)) continue;
      
      // Skip if out of bounds
      if (!isPointInBounds(current, this.width, this.height)) continue;
      
      // Skip if not empty
      if (this.grid[current.y][current.x] !== CellType.EMPTY) continue;
      
      // Mark as visited
      visitedSet.add(key);
      cells.push(current);
      
      // Add 4-directional neighbors to queue
      const neighbors = getFourNeighbors(current);
      for (const neighbor of neighbors) {
        queue.push(neighbor);
      }
    }
    
    return {
      cells,
      size: cells.length,
    };
  }

  /**
   * Capture area (mark all cells as CLAIMED)
   */
  public captureArea(area: Area): void {
    for (const cell of area.cells) {
      this.grid[cell.y][cell.x] = CellType.CLAIMED;
    }
  }

  /**
   * Capture all areas without enemies
   */
  public captureEmptyAreas(enemyPositions?: Point[]): number {
    const areas = this.findEmptyAreas();
    let capturedCells = 0;
    
    for (const area of areas) {
      // Check if area has enemy
      let hasEnemy = false;
      
      if (enemyPositions) {
        for (const enemyPos of enemyPositions) {
          if (area.cells.some(cell => cell.x === enemyPos.x && cell.y === enemyPos.y)) {
            hasEnemy = true;
            break;
          }
        }
      }
      
      // Capture if no enemy
      if (!hasEnemy) {
        this.captureArea(area);
        capturedCells += area.size;
      }
    }
    
    return capturedCells;
  }

  /**
   * Get grid statistics
   */
  public getStats(): GridStats {
    let emptyCells = 0;
    let borderCells = 0;
    let traceCells = 0;
    let claimedCells = 0;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        switch (this.grid[y][x]) {
          case CellType.EMPTY:
            emptyCells++;
            break;
          case CellType.BORDER:
            borderCells++;
            break;
          case CellType.TRACE:
            traceCells++;
            break;
          case CellType.CLAIMED:
            claimedCells++;
            break;
        }
      }
    }
    
    const totalCells = this.width * this.height;
    const capturableCells = totalCells - borderCells;
    const claimedPercentage = capturableCells > 0 
      ? (claimedCells / capturableCells) * 100 
      : 0;
    
    return {
      totalCells,
      emptyCells,
      borderCells,
      traceCells,
      claimedCells,
      claimedPercentage,
    };
  }

  /**
   * Get raw grid data (for rendering)
   */
  public getGrid(): CellType[][] {
    return this.grid;
  }

  /**
   * Get grid dimensions
   */
  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getCellSize(): number {
    return this.cellSize;
  }

  /**
   * Clone grid (deep copy)
   */
  public clone(): Grid {
    const newGrid = new Grid(this.width, this.height, this.cellSize);
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        newGrid.grid[y][x] = this.grid[y][x];
      }
    }
    
    return newGrid;
  }

  /**
   * Check if grid is fully captured (win condition)
   */
  public isFullyCaptured(threshold: number = 75): boolean {
    const stats = this.getStats();
    return stats.claimedPercentage >= threshold;
  }

  /**
   * Export grid as string (debugging)
   */
  public toString(): string {
    let str = '';
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid[y][x];
        
        switch (cell) {
          case CellType.EMPTY:
            str += '·';
            break;
          case CellType.BORDER:
            str += '█';
            break;
          case CellType.TRACE:
            str += '○';
            break;
          case CellType.CLAIMED:
            str += '▓';
            break;
        }
        
        str += ' ';
      }
      str += '\n';
    }
    
    return str;
  }
}

