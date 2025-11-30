import { Graphics, FillGradient, Container } from 'pixi.js';
import type { Application as PIXIApplication } from 'pixi.js';
import type { SceneManager } from '@core/SceneManager';
import { BaseScene } from './BaseScene';
import { Player } from '@entities/Player';
import { Enemy } from '@entities/Enemy';
import { HUD } from '@ui/HUD';
import { InputSystem } from '@systems/InputSystem';
import { CollisionSystem } from '@systems/CollisionSystem';
import { GameDimensions } from '@utils/Constants';
import { DesignSystem as DS } from '@utils/DesignSystem';

/**
 * ZONA - Game Scene (NEON VOID Theme)
 * Ana oyun sahnesi - Gameplay ve entity yönetimi
 */
export class GameScene extends BaseScene {
  private player!: Player;
  private enemies: Enemy[] = [];
  private hud!: HUD;
  private inputSystem!: InputSystem;
  private collisionSystem!: CollisionSystem;
  private score: number = 0;
  
  // Game area with border
  private contentContainer!: Container;
  private border!: Graphics;
  private readonly borderPadding = 80; // 5rem = 80px

  constructor(app: PIXIApplication, sceneManager: SceneManager) {
    super(app, sceneManager, 'game');
  }

  protected onCreate(): void {
    // Animated gradient background - Design System
    const background = new Graphics();
    const gradient = new FillGradient(0, 0, 0, GameDimensions.GAME_HEIGHT);
    gradient.addColorStop(0, DS.colors.background.primary);
    gradient.addColorStop(1, DS.colors.background.secondary);
    background.rect(0, 0, GameDimensions.GAME_WIDTH, GameDimensions.GAME_HEIGHT);
    background.fill(gradient);
    this.container.addChild(background);

    // Create border around game area
    this.createBorder();

    // Create content container with padding
    this.contentContainer = new Container();
    this.contentContainer.position.set(this.borderPadding, this.borderPadding);
    this.container.addChild(this.contentContainer);

    // Sistemleri başlat
    this.inputSystem = new InputSystem();
    this.collisionSystem = new CollisionSystem();

    // Oyuncu oluştur (content area içinde)
    const contentWidth = GameDimensions.GAME_WIDTH - this.borderPadding * 2;
    const contentHeight = GameDimensions.GAME_HEIGHT - this.borderPadding * 2;
    this.player = new Player(contentWidth / 2, contentHeight - 100);
    this.contentContainer.addChild(this.player);

    // Test düşmanı (content area içinde)
    const enemy = new Enemy(contentWidth / 2, 100);
    this.enemies.push(enemy);
    this.contentContainer.addChild(enemy);

    // HUD (content area içinde)
    this.hud = new HUD();
    this.hud.setScore(this.score);
    this.contentContainer.addChild(this.hud);

    // ESC tuşu ile menüye dön
    this.inputSystem.onKeyPress('Escape', () => {
      this.sceneManager.changeScene('menu');
    });

    console.log('🎮 Game scene - NEON VOID theme loaded');
  }

  /**
   * Create border around the game area
   */
  private createBorder(): void {
    this.border = new Graphics();
    
    const width = GameDimensions.GAME_WIDTH;
    const height = GameDimensions.GAME_HEIGHT;
    const padding = this.borderPadding;
    
    // Inner rectangle (game area border)
    this.border.rect(padding, padding, width - padding * 2, height - padding * 2);
    this.border.stroke({ 
      color: DS.colors.neon.cyan, 
      width: 2,
      alpha: 0.3
    });
    
    // Corner decorations (small lines at corners)
    const cornerSize = 20;
    const corners = [
      { x: padding, y: padding }, // Top-left
      { x: width - padding, y: padding }, // Top-right
      { x: padding, y: height - padding }, // Bottom-left
      { x: width - padding, y: height - padding }, // Bottom-right
    ];
    
    corners.forEach(({ x, y }) => {
      // Horizontal line
      this.border.moveTo(x - cornerSize, y);
      this.border.lineTo(x + cornerSize, y);
      
      // Vertical line
      this.border.moveTo(x, y - cornerSize);
      this.border.lineTo(x, y + cornerSize);
    });
    
    this.border.stroke({ 
      color: DS.colors.neon.cyan, 
      width: 3,
      alpha: 0.6
    });
    
    this.container.addChild(this.border);
  }

  protected onUpdate(deltaTime: number): void {
    const contentWidth = GameDimensions.GAME_WIDTH - this.borderPadding * 2;
    const contentHeight = GameDimensions.GAME_HEIGHT - this.borderPadding * 2;
    
    // Oyuncu güncelle
    this.player.updatePlayer(deltaTime, this.inputSystem, contentWidth, contentHeight);

    // Düşmanları güncelle
    for (const enemy of this.enemies) {
      enemy.update(deltaTime, contentWidth);

      // Çarpışma kontrolü
      if (this.collisionSystem.checkCollision(this.player, enemy)) {
        console.log('💥 Collision detected!');
        this.gameOver();
      }
    }
  }

  private gameOver(): void {
    console.log('💀 Game Over!');
    this.sceneManager.changeScene('gameover');
  }

  protected onDestroy(): void {
    this.inputSystem.destroy();
  }
}

