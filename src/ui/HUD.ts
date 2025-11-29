import { Container, Text, Graphics } from 'pixi.js';
import { GAME_WIDTH } from '@utils/Constants';
import { DesignSystem as DS } from '@utils/DesignSystem';
import { i18n } from '@utils/i18n';

/**
 * ZONA - HUD (NEON VOID Theme)
 * Heads-Up Display - Skor, can barı gibi UI elementleri
 */
export class HUD extends Container {
  private scoreText!: Text;
  private scorePanel!: Graphics;
  private score: number = 0;

  constructor() {
    super();
    this.createHUD();
    
    // Subscribe to language changes
    i18n.onLanguageChange(() => this.updateText());
  }

  /**
   * HUD elementlerini oluştur - Design System
   */
  private createHUD(): void {
    // Score panel background
    this.scorePanel = new Graphics();
    this.scorePanel.roundRect(0, 0, 200, 60, DS.effects.radius.md);
    this.scorePanel.fill({ color: DS.colors.background.secondary, alpha: 0.8 });
    this.scorePanel.roundRect(0, 0, 200, 60, DS.effects.radius.md);
    this.scorePanel.stroke({ 
      color: DS.colors.neon.cyan, 
      width: DS.effects.border.normal,
      alpha: 0.6
    });
    this.scorePanel.position.set(DS.layout.positions.hudPadding, DS.layout.positions.hudPadding);
    this.addChild(this.scorePanel);

    // Score text
    this.scoreText = new Text({
      text: `${i18n.t('game.score')}: 0`,
      style: {
        fontFamily: DS.typography.fontFamily.mono,
        fontSize: DS.typography.fontSize.xl,
        fontWeight: DS.typography.fontWeight.bold,
        fill: DS.colors.ui.textPrimary,
        dropShadow: {
          alpha: 0.8,
          angle: 0,
          blur: 8,
          color: DS.colors.neon.cyan,
          distance: 0,
        },
      }
    });
    this.scoreText.position.set(
      DS.layout.positions.hudPadding + 15, 
      DS.layout.positions.hudPadding + 15
    );
    this.addChild(this.scoreText);
  }

  /**
   * Skoru güncelle
   */
  public setScore(score: number): void {
    this.score = score;
    this.updateText();
  }

  /**
   * Update text with current language
   */
  private updateText(): void {
    this.scoreText.text = `${i18n.t('game.score')}: ${this.score}`;
  }

  /**
   * Skor ekle
   */
  public addScore(amount: number): void {
    this.setScore(this.score + amount);
  }

  /**
   * Skoru al
   */
  public getScore(): number {
    return this.score;
  }
}

