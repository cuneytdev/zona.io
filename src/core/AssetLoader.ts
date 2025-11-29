import { Assets } from 'pixi.js';
import type { AssetManifest } from '../types';

/**
 * Asset yönetim sınıfı
 * PixiJS Assets API kullanarak resource'ları yükler
 */
export class AssetLoader {
  private manifest: AssetManifest = {
    // Buraya asset'lerinizi ekleyin
    // 'player': '/assets/images/player.png',
    // 'enemy': '/assets/images/enemy.png',
    // 'background': '/assets/images/background.png',
  };

  /**
   * Tüm asset'leri yükle
   */
  public async loadAssets(): Promise<void> {
    try {
      // Manifest'e asset'leri ekle
      for (const [alias, src] of Object.entries(this.manifest)) {
        Assets.add({ alias, src });
      }

      // Asset'leri yükle
      const assets = Object.keys(this.manifest);
      if (assets.length > 0) {
        await Assets.load(assets);
        console.log('✅ Assets loaded:', assets);
      } else {
        console.log('ℹ️ No assets to load');
      }
    } catch (error) {
      console.error('❌ Error loading assets:', error);
    }
  }

  /**
   * Tek bir asset ekle
   */
  public addAsset(alias: string, src: string): void {
    this.manifest[alias] = src;
    Assets.add({ alias, src });
  }

  /**
   * Asset'i al
   */
  public getAsset<T>(alias: string): T {
    return Assets.get(alias);
  }
}

