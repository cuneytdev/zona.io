import { Keys } from '@utils/Constants';

/**
 * Input yönetim sistemi
 * Klavye, mouse ve touch inputlarını yönetir
 */
export class InputSystem {
  private keysPressed: Set<string> = new Set();
  private keyPressCallbacks: Map<string, () => void> = new Map();

  constructor() {
    this.init();
  }

  /**
   * Input sistemini başlat
   */
  private init(): void {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  /**
   * Tuşa basıldığında
   */
  private onKeyDown(event: KeyboardEvent): void {
    const key = event.code;
    
    if (!this.keysPressed.has(key)) {
      this.keysPressed.add(key);
      
      // Callback varsa çağır
      const callback = this.keyPressCallbacks.get(key);
      if (callback) {
        callback();
      }
    }
  }

  /**
   * Tuş bırakıldığında
   */
  private onKeyUp(event: KeyboardEvent): void {
    this.keysPressed.delete(event.code);
  }

  /**
   * Tuşun basılı olup olmadığını kontrol et
   */
  public isKeyDown(key: string): boolean {
    return this.keysPressed.has(key);
  }

  /**
   * Tuş basıldığında callback kaydet
   */
  public onKeyPress(key: string, callback: () => void): void {
    this.keyPressCallbacks.set(key, callback);
  }

  /**
   * Callback'i kaldır
   */
  public removeKeyPress(key: string): void {
    this.keyPressCallbacks.delete(key);
  }

  /**
   * Temizle
   */
  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    window.removeEventListener('keyup', this.onKeyUp.bind(this));
    this.keysPressed.clear();
    this.keyPressCallbacks.clear();
  }
}

