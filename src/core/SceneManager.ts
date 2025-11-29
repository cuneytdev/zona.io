import type { Application as PIXIApplication } from 'pixi.js';
import type { IScene } from '@types/index';
import { MenuScene } from '@scenes/MenuScene';
import { GameScene } from '@scenes/GameScene';
import { GameOverScene } from '@scenes/GameOverScene';

/**
 * Sahne yönetim sınıfı
 * Sahneler arası geçişleri koordine eder
 */
export class SceneManager {
  private app: PIXIApplication;
  private currentScene: IScene | null = null;

  constructor(app: PIXIApplication) {
    this.app = app;
  }

  /**
   * Sahne değiştir - Her seferinde yeni sahne instance'ı oluştur
   */
  public changeScene(name: string): void {
    // Mevcut sahneyi temizle
    if (this.currentScene) {
      this.currentScene.destroy();
      this.app.stage.removeChildren();
    }

    // Yeni sahne oluştur
    let scene: IScene | null = null;
    
    switch (name) {
      case 'menu':
        scene = new MenuScene(this.app, this);
        break;
      case 'game':
        scene = new GameScene(this.app, this);
        break;
      case 'gameover':
        scene = new GameOverScene(this.app, this);
        break;
      default:
        console.error(`❌ Scene not found: ${name}`);
        return;
    }

    // Yeni sahneyi başlat
    this.currentScene = scene;
    this.currentScene.init();
    
    console.log(`🎬 Scene changed to: ${name}`);
  }

  /**
   * Aktif sahneyi al
   */
  public getCurrentScene(): IScene | null {
    return this.currentScene;
  }

  /**
   * Temizle
   */
  public destroy(): void {
    if (this.currentScene) {
      this.currentScene.destroy();
    }
  }
}

