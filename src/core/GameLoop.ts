import type { Application as PIXIApplication } from 'pixi.js';
import type { SceneManager } from './SceneManager';

/**
 * Oyun döngüsü sınıfı
 * Update ve render cycle'ını yönetir
 */
export class GameLoop {
  private app: PIXIApplication;
  private sceneManager: SceneManager;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor(app: PIXIApplication, sceneManager: SceneManager) {
    this.app = app;
    this.sceneManager = sceneManager;
  }

  /**
   * Oyun döngüsünü başlat
   */
  public start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    
    // PixiJS ticker'ı kullan
    this.app.ticker.add(this.update, this);
    
    console.log('🔄 Game loop started');
  }

  /**
   * Oyun döngüsünü durdur
   */
  public stop(): void {
    this.isRunning = false;
    this.app.ticker.remove(this.update, this);
    console.log('⏸️ Game loop stopped');
  }

  /**
   * Update fonksiyonu (her frame)
   */
  private update(): void {
    if (!this.isRunning) return;

    // Delta time hesapla (milisaniye)
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Aktif sahneyi güncelle
    const currentScene = this.sceneManager.getCurrentScene();
    if (currentScene) {
      currentScene.update(deltaTime);
    }
  }

  /**
   * FPS al
   */
  public getFPS(): number {
    return Math.round(this.app.ticker.FPS);
  }
}

