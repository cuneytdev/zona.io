import { Graphics } from 'pixi.js';
import { Entity } from './Entity';
import { GameDimensions } from '@utils/Constants';
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
    const size = this.entityWidth / 2;
    
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
  public updatePlayer(deltaTime: number, inputSystem: InputSystem): void {
    super.update(deltaTime);

    // Hareket kontrolü
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (inputSystem.isKeyDown('ArrowLeft')) {
      this.velocity.x = -this.speed;
    }
    if (inputSystem.isKeyDown('ArrowRight')) {
      this.velocity.x = this.speed;
    }
    if (inputSystem.isKeyDown('ArrowUp')) {
      this.velocity.y = -this.speed;
    }
    if (inputSystem.isKeyDown('ArrowDown')) {
      this.velocity.y = this.speed;
    }

    // Pozisyonu güncelle
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Ekran sınırları
    this.clampPosition(
      this.entityWidth / 2,
      GameDimensions.GAME_WIDTH - this.entityWidth / 2,
      this.entityHeight / 2,
      GameDimensions.GAME_HEIGHT - this.entityHeight / 2
    );
  }
}

