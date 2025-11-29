// Oyun sabitleri
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
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

