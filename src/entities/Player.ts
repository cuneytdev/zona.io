import { Graphics } from 'pixi.js';
import { Entity } from './Entity';
import { GAME_WIDTH, GAME_HEIGHT, Keys } from '@utils/Constants';
import { DesignSystem as DS } from '@utils/DesignSystem';
import type { InputSystem } from '@systems/InputSystem';

/**
 * ZONA - Player Entity (NEON VOID Theme)
 * Oyuncu entity - Mint green hexagon with cyan glow
 */
export class Player extends Entity {
  private graphic!: Graphics;

  constructor(x: number, y: number) {
    super(x, y, DS.sizes.entity.player, DS.sizes.entity.player);
    this.speed = 5;
  }

  protected createGraphics(): void {
    this.graphic = new Graphics();
    
    // Hexagon shape (NEON VOID style)
    const points: number[] = [];
    const size = this.width / 2;
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(Math.cos(angle) * size, Math.sin(angle) * size);
    }
    
    // Fill with mint green
    this.graphic.poly(points);
    this.graphic.fill(DS.colors.entity.player);
    
    // Neon cyan border with glow
    this.graphic.poly(points);
    this.graphic.stroke({ 
      color: DS.colors.entity.playerGlow, 
      width: 3 
    });
    
    // Inner core (bright center)
    this.graphic.circle(0, 0, size / 4);
    this.graphic.fill({ color: 0xffffff, alpha: 0.8 });
    
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

