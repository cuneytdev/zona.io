import { Container } from 'pixi.js';

/**
 * Temel entity sınıfı
 * Tüm oyun objelerinin base class'ı
 */
export abstract class Entity extends Container {
  protected velocity: { x: number; y: number };
  protected speed: number;
  public entityWidth: number;
  public entityHeight: number;

  constructor(x: number, y: number, width: number = 50, height: number = 50) {
    super();
    
    this.position.set(x, y);
    this.entityWidth = width;
    this.entityHeight = height;
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
  public update(_deltaTime: number): void {
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
   * Collision bounds'ı al (collision için)
   */
  public getCollisionBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x - this.entityWidth / 2,
      y: this.y - this.entityHeight / 2,
      width: this.entityWidth,
      height: this.entityHeight
    };
  }
}

