import { Graphics } from 'pixi.js';
import { Entity } from './Entity';
import { GAME_WIDTH, GAME_HEIGHT, Keys } from '@utils/Constants';
import type { InputSystem } from '@systems/InputSystem';

/**
 * Oyuncu entity'si
 * Input handling ve oyuncu kontrolleri
 */
export class Player extends Entity {
  private graphic!: Graphics;

  constructor(x: number, y: number) {
    super(x, y, 60, 60);
    this.speed = 5;
  }

  protected createGraphics(): void {
    this.graphic = new Graphics();
    
    // Basit bir kare (player temsili)
    this.graphic.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.graphic.fill(0x16c79a);
    
    // Gözler
    this.graphic.circle(-15, -10, 5);
    this.graphic.fill(0xffffff);
    this.graphic.circle(15, -10, 5);
    this.graphic.fill(0xffffff);
    
    this.addChild(this.graphic);
  }

  /**
   * Oyuncu güncelleme (input ile)
   */
  public update(deltaTime: number, inputSystem: InputSystem): void {
    super.update(deltaTime);

    // Hareket kontrolü
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (inputSystem.isKeyDown(Keys.LEFT)) {
      this.velocity.x = -this.speed;
    }
    if (inputSystem.isKeyDown(Keys.RIGHT)) {
      this.velocity.x = this.speed;
    }
    if (inputSystem.isKeyDown(Keys.UP)) {
      this.velocity.y = -this.speed;
    }
    if (inputSystem.isKeyDown(Keys.DOWN)) {
      this.velocity.y = this.speed;
    }

    // Pozisyonu güncelle
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Ekran sınırları
    this.clampPosition(
      this.width / 2,
      GAME_WIDTH - this.width / 2,
      this.height / 2,
      GAME_HEIGHT - this.height / 2
    );
  }
}

