import { Container, Graphics } from 'pixi.js';

/**
 * Temel entity sınıfı
 * Tüm oyun objelerinin base class'ı
 */
export abstract class Entity extends Container {
  protected velocity: { x: number; y: number };
  protected speed: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number = 50, height: number = 50) {
    super();
    
    this.position.set(x, y);
    this.width = width;
    this.height = height;
    this.velocity = { x: 0, y: 0 };
    this.speed = 0;

    this.createGraphics();
  }

  /**
   * Entity görselini oluştur (override edilmeli)
   */
  protected abstract createGraphics(): void;

  /**
   * Entity güncelleme (override edilebilir)
   */
  public update(deltaTime: number): void {
    // Override edilebilir
  }

  /**
   * Sınırlar içinde tut
   */
  protected clampPosition(minX: number, maxX: number, minY: number, maxY: number): void {
    if (this.x < minX) this.x = minX;
    if (this.x > maxX) this.x = maxX;
    if (this.y < minY) this.y = minY;
    if (this.y > maxY) this.y = maxY;
  }

  /**
   * Bounding box'ı al (collision için)
   */
  public getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }
}

