import { Application as PIXIApplication } from 'pixi.js';
import { GameDimensions, BACKGROUND_COLOR } from '@utils/Constants';
import type { GameConfig } from '../types';
import { SceneManager } from './SceneManager';
import { AssetLoader } from './AssetLoader';
import { GameLoop } from './GameLoop';

/**
 * Ana uygulama sınıfı
 * PixiJS uygulamasını başlatır ve tüm sistemleri koordine eder
 */
export class Application {
  public app!: PIXIApplication;
  public sceneManager!: SceneManager;
  public assetLoader!: AssetLoader;
  public gameLoop!: GameLoop;
  
  private config: GameConfig;

  constructor(config?: Partial<GameConfig>) {
    this.config = {
      width: config?.width ?? GameDimensions.GAME_WIDTH,
      height: config?.height ?? GameDimensions.GAME_HEIGHT,
      backgroundColor: config?.backgroundColor ?? BACKGROUND_COLOR,
      resolution: config?.resolution ?? (window.devicePixelRatio || 1)
    };
  }

  /**
   * Uygulamayı başlat
   */
  public async init(): Promise<void> {
    // PixiJS uygulamasını oluştur
    this.app = new PIXIApplication();
    
    await this.app.init({
      width: this.config.width,
      height: this.config.height,
      backgroundColor: this.config.backgroundColor,
      resolution: this.config.resolution,
      autoDensity: true,
      resizeTo: window, // Otomatik resize
    });

    // Canvas'ı DOM'a ekle
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(this.app.canvas);
      
      // Loading yazısını kaldır
      const loading = document.getElementById('loading');
      if (loading) {
        loading.remove();
      }
    }

    // Alt sistemleri başlat
    this.assetLoader = new AssetLoader();
    this.sceneManager = new SceneManager(this.app);
    this.gameLoop = new GameLoop(this.app, this.sceneManager);

    // Asset'leri yükle
    await this.assetLoader.loadAssets();

    // İlk sahneyi başlat (Menu)
    this.sceneManager.changeScene('menu');

    // Oyun döngüsünü başlat
    this.gameLoop.start();

    // Listen to resize events
    GameDimensions.onResize(() => {
      this.onResize();
    });

    console.log('🎮 ZONA initialized successfully!');
  }

  /**
   * Handle window resize
   */
  private onResize(): void {
    // Sahne resize bildirimini gönder
    const currentScene = this.sceneManager.getCurrentScene();
    if (currentScene && 'onResize' in currentScene) {
      (currentScene as any).onResize();
    }
  }

  /**
   * Uygulamayı temizle
   */
  public destroy(): void {
    this.gameLoop.stop();
    this.sceneManager.destroy();
    this.app.destroy(true);
  }
}

