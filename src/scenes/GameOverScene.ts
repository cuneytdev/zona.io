import { Text, Graphics, FillGradient } from 'pixi.js';
import type { Application as PIXIApplication } from 'pixi.js';
import type { SceneManager } from '@core/SceneManager';
import { BaseScene } from './BaseScene';
import { Button } from '@ui/Button';
import { GAME_WIDTH, GAME_HEIGHT } from '@utils/Constants';
import { DesignSystem as DS } from '@utils/DesignSystem';
import { i18n } from '@utils/i18n';

/**
 * ZONA - Game Over Scene (NEON VOID Theme)
 * Skor gösterimi ve restart
 */
export class GameOverScene extends BaseScene {
  private gameOverText!: Text;
  private glowEffect!: Graphics;
  private restartButton!: Button;
  private menuButton!: Button;
  private glowPhase: number = 0;

  constructor(app: PIXIApplication, sceneManager: SceneManager) {
    super(app, sceneManager, 'gameover');
    
    // Subscribe to language changes
    i18n.onLanguageChange(() => this.updateTexts());
  }

  protected onCreate(): void {
    // Dark gradient background - Design System
    const background = new Graphics();
    const gradient = new FillGradient(0, 0, 0, GAME_HEIGHT);
    gradient.addColorStop(0, DS.colors.background.primary);
    gradient.addColorStop(1, 0x2d1b2e); // Darker tone for game over
    background.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    background.fill(gradient);
    this.container.addChild(background);

    // Danger glow effect
    this.glowEffect = new Graphics();
    this.glowEffect.circle(0, 0, 200);
    this.glowEffect.fill({ color: DS.colors.neon.pink, alpha: 0.1 });
    this.glowEffect.position.set(DS.layout.screen.centerX, DS.layout.positions.titleY);
    this.container.addChild(this.glowEffect);

    // Game Over text - Neon danger style
    this.gameOverText = new Text({
      text: i18n.t('gameOver.title'),
      style: {
        fontFamily: DS.typography.fontFamily.bold,
        fontSize: DS.typography.fontSize['4xl'],
        fontWeight: DS.typography.fontWeight.heavy,
        fill: DS.colors.background.primary,
        stroke: { color: DS.colors.neon.pink, width: 4 },
        letterSpacing: DS.typography.letterSpacing.wide,
        dropShadow: {
          alpha: DS.effects.alpha.solid,
          angle: 0,
          blur: DS.effects.shadow.lg.blur,
          color: DS.colors.neon.pink,
          distance: 0,
        },
      }
    });
    this.gameOverText.anchor.set(0.5);
    this.gameOverText.position.set(DS.layout.screen.centerX, DS.layout.positions.titleY);
    this.container.addChild(this.gameOverText);

    // Restart button - Success preset
    const successPreset = DS.presets.button.success;
    this.restartButton = new Button({
      text: i18n.t('gameOver.restart'),
      width: DS.sizes.button.md.width,
      height: DS.sizes.button.md.height,
      backgroundColor: successPreset.backgroundColor,
      textColor: successPreset.textColor,
      fontSize: successPreset.fontSize,
      borderRadius: successPreset.borderRadius,
      onClick: () => this.onRestartClick()
    });
    this.restartButton.position.set(DS.layout.screen.centerX, DS.layout.screen.centerY);
    this.container.addChild(this.restartButton);

    // Menu button - Secondary preset
    const secondaryPreset = DS.presets.button.secondary;
    this.menuButton = new Button({
      text: i18n.t('gameOver.mainMenu'),
      width: DS.sizes.button.md.width,
      height: DS.sizes.button.md.height,
      backgroundColor: secondaryPreset.backgroundColor,
      textColor: secondaryPreset.textColor,
      fontSize: secondaryPreset.fontSize,
      borderRadius: secondaryPreset.borderRadius,
      onClick: () => this.onMenuClick()
    });
    this.menuButton.position.set(DS.layout.screen.centerX, DS.layout.screen.centerY + 70);
    this.container.addChild(this.menuButton);

    console.log('💀 GameOver scene - NEON VOID theme loaded');
  }

  protected onUpdate(deltaTime: number): void {
    const time = Date.now();
    
    // Danger glow pulse
    this.glowPhase += deltaTime / 1000;
    const pulse = Math.sin(this.glowPhase * 3) * 0.15 + 1;
    this.glowEffect.scale.set(pulse);
    this.glowEffect.alpha = 0.1 + Math.sin(this.glowPhase * 3) * 0.05;

    // Game Over text subtle shake (danger feel)
    this.gameOverText.x = DS.layout.screen.centerX + Math.sin(time / 100) * 2;
  }

  private onRestartClick(): void {
    console.log('🔄 Restarting game...');
    this.sceneManager.changeScene('game');
  }

  private onMenuClick(): void {
    console.log('🏠 Returning to menu...');
    this.sceneManager.changeScene('menu');
  }

  /**
   * Update texts when language changes
   */
  private updateTexts(): void {
    this.gameOverText.text = i18n.t('gameOver.title');
    this.restartButton.setText(i18n.t('gameOver.restart'));
    this.menuButton.setText(i18n.t('gameOver.mainMenu'));
  }

  protected onDestroy(): void {
    // Cleanup
  }
}

