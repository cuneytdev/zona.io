import { Graphics } from 'pixi.js';
import { Entity } from './Entity';
import { GAME_WIDTH, GAME_HEIGHT } from '@utils/Constants';

/**
 * Düşman entity'si
 * Basit AI ve hareket
 */
export class Enemy extends Entity {
  private graphic!: Graphics;
  private moveDirection: number = 1;

  constructor(x: number, y: number) {
    super(x, y, 50, 50);
    this.speed = 2;
  }

  protected createGraphics(): void {
    this.graphic = new Graphics();
    
    // Basit bir kare (düşman temsili)
    this.graphic.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.graphic.fill(0xff4757);
    
    // Gözler
    this.graphic.circle(-12, -8, 4);
    this.graphic.fill(0x000000);
    this.graphic.circle(12, -8, 4);
    this.graphic.fill(0x000000);
    
    this.addChild(this.graphic);
  }

  /**
   * Düşman güncelleme (basit AI)
   */
  public update(deltaTime: number): void {
    super.update(deltaTime);

    // Basit yatay hareket (sağa-sola)
    this.x += this.speed * this.moveDirection;

    // Ekran kenarına gelince yön değiştir
    if (this.x <= this.width / 2 || this.x >= GAME_WIDTH - this.width / 2) {
      this.moveDirection *= -1;
    }
  }
}

