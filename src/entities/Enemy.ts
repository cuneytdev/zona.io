import { Graphics, FillGradient } from 'pixi.js';
import { Entity } from './Entity';
import { GameDimensions } from '@utils/Constants';
import { DesignSystem as DS } from '@utils/DesignSystem';

/**
 * ZONA - Enemy Entity (NEON VOID Theme)
 * Düşman entity - Hot pink orb with purple glow
 */
export class Enemy extends Entity {
  private graphic!: Graphics;
  private moveDirection: number = 1;
  private pulsePhase: number = 0;

  constructor(x: number, y: number) {
    super(x, y, DS.sizes.entity.enemy, DS.sizes.entity.enemy);
    this.speed = 2;
  }

  protected createGraphics(): void {
    this.graphic = new Graphics();
    const radius = this.entityWidth / 2;
    
    // Outer glow
    this.graphic.circle(0, 0, radius + 5);
    this.graphic.fill({ color: DS.colors.entity.enemyGlow, alpha: 0.3 });
    
    // Main orb with gradient
    const gradient = new FillGradient(0, -radius, 0, radius);
    gradient.addColorStop(0, DS.colors.entity.enemy);
    gradient.addColorStop(1, DS.colors.entity.enemyGlow);
    
    this.graphic.circle(0, 0, radius);
    this.graphic.fill(gradient);
    
    // Bright core
    this.graphic.circle(0, 0, radius / 3);
    this.graphic.fill({ color: 0xffffff, alpha: 0.9 });
    
    // Neon border
    this.graphic.circle(0, 0, radius);
    this.graphic.stroke({ 
      color: DS.colors.entity.enemyGlow, 
      width: 2 
    });
    
    this.addChild(this.graphic);
  }

  /**
   * Düşman güncelleme (basit AI + pulse animation)
   */
  public update(deltaTime: number, contentWidth?: number): void {
    super.update(deltaTime);

    // Basit yatay hareket (sağa-sola)
    this.x += this.speed * this.moveDirection;

    // Ekran kenarına gelince yön değiştir (content area or full screen)
    const maxWidth = contentWidth || GameDimensions.GAME_WIDTH;
    
    if (this.x <= this.entityWidth / 2 || this.x >= maxWidth - this.entityWidth / 2) {
      this.moveDirection *= -1;
    }

    // Pulsing glow animation
    this.pulsePhase += deltaTime / 1000;
    const pulse = Math.sin(this.pulsePhase * 4) * 0.1 + 1;
    this.scale.set(pulse);
  }
}

