// Oyun sabitleri - Dinamik (Responsive)

/**
 * Game Dimensions Manager
 * Window boyutuna göre dinamik oyun boyutları
 */
class GameConstants {
  private _width: number = 1280;
  private _height: number = 720;
  private resizeCallbacks: Set<() => void> = new Set();

  constructor() {
    this.updateDimensions();
    window.addEventListener('resize', () => this.updateDimensions());
  }

  private updateDimensions(): void {
    // Use window inner dimensions
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    
    // Notify all subscribers
    this.resizeCallbacks.forEach(callback => callback());
  }

  public get GAME_WIDTH(): number {
    return this._width;
  }

  public get GAME_HEIGHT(): number {
    return this._height;
  }

  /**
   * Subscribe to resize events
   */
  public onResize(callback: () => void): void {
    this.resizeCallbacks.add(callback);
  }

  /**
   * Unsubscribe from resize events
   */
  public offResize(callback: () => void): void {
    this.resizeCallbacks.delete(callback);
  }
}

// Export singleton instance
export const GameDimensions = new GameConstants();

// Export convenient getters (dynamically updated)
export const getGameWidth = (): number => GameDimensions.GAME_WIDTH;
export const getGameHeight = (): number => GameDimensions.GAME_HEIGHT;

// Legacy support (backward compatible)
export const GAME_WIDTH = GameDimensions.GAME_WIDTH;
export const GAME_HEIGHT = GameDimensions.GAME_HEIGHT;

export const BACKGROUND_COLOR = 0x1a1a2e;

// Fizik sabitleri
export const GRAVITY = 0.5;
export const MAX_VELOCITY = 10;

// Oyun durumları
export enum GameState {
  MENU = 'menu',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAMEOVER = 'gameover'
}

// Tuş kodları
export enum Keys {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  SPACE = 'Space',
  ESCAPE = 'Escape'
}
