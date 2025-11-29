import { Application as PIXIApplication, Assets } from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT, BACKGROUND_COLOR } from '@utils/Constants';
import type { GameConfig } from '@types/index';
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
      width: config?.width ?? GAME_WIDTH,
      height: config?.height ?? GAME_HEIGHT,
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

    console.log('🎮 ZONA initialized successfully!');
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

