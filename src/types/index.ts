export interface IScene {
  name: string;
  init(): void;
  update(deltaTime: number): void;
  destroy(): void;
}

export interface GameConfig {
  width: number;
  height: number;
  backgroundColor: number;
  resolution: number;
}

export interface AssetManifest {
  [key: string]: string;
}

