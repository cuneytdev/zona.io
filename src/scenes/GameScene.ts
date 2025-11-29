import { Graphics, FillGradient } from 'pixi.js';
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

    // Sistemleri başlat
    this.inputSystem = new InputSystem();
    this.collisionSystem = new CollisionSystem();

    // Oyuncu oluştur
    this.player = new Player(GameDimensions.GAME_WIDTH / 2, GameDimensions.GAME_HEIGHT - 100);
    this.container.addChild(this.player);

    // Test düşmanı
    const enemy = new Enemy(GameDimensions.GAME_WIDTH / 2, 100);
    this.enemies.push(enemy);
    this.container.addChild(enemy);

    // HUD
    this.hud = new HUD();
    this.hud.setScore(this.score);
    this.container.addChild(this.hud);

    // ESC tuşu ile menüye dön
    this.inputSystem.onKeyPress('Escape', () => {
      this.sceneManager.changeScene('menu');
    });

    console.log('🎮 Game scene - NEON VOID theme loaded');
  }

  protected onUpdate(deltaTime: number): void {
    // Oyuncu güncelle
    this.player.updatePlayer(deltaTime, this.inputSystem);

    // Düşmanları güncelle
    for (const enemy of this.enemies) {
      enemy.update(deltaTime);

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

