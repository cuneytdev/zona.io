import { Container } from 'pixi.js';
import type { Application as PIXIApplication } from 'pixi.js';
import type { IScene } from '@types/index';
import type { SceneManager } from '@core/SceneManager';

/**
 * Temel sahne sınıfı
 * Tüm sahnelerin miras aldığı abstract base class
 */
export abstract class BaseScene implements IScene {
  public name: string;
  protected app: PIXIApplication;
  protected sceneManager: SceneManager;
  protected container: Container;

  constructor(app: PIXIApplication, sceneManager: SceneManager, name: string) {
    this.app = app;
    this.sceneManager = sceneManager;
    this.name = name;
    this.container = new Container();
  }

  /**
   * Sahne başlatma
   */
  public init(): void {
    this.app.stage.addChild(this.container);
    this.onCreate();
  }

  /**
   * Sahne oluşturulduğunda çağrılır (override edilmeli)
   */
  protected abstract onCreate(): void;

  /**
   * Her frame güncelleme
   */
  public update(deltaTime: number): void {
    this.onUpdate(deltaTime);
  }

  /**
   * Update logic (override edilmeli)
   */
  protected abstract onUpdate(deltaTime: number): void;

  /**
   * Sahne temizleme
   */
  public destroy(): void {
    this.onDestroy();
    this.container.destroy({ children: true });
  }

  /**
   * Sahne yok edilmeden önce çağrılır (override edilebilir)
   */
  protected onDestroy(): void {
    // Override edilebilir
  }

  /**
   * Window resize olduğunda çağrılır (override edilebilir)
   */
  public onResize(): void {
    // Override edilebilir
  }
}

