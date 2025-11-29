import { Text, Graphics, FillGradient } from 'pixi.js';
import type { Application as PIXIApplication } from 'pixi.js';
import type { SceneManager } from '@core/SceneManager';
import { BaseScene } from './BaseScene';
import { Button } from '@ui/Button';
import { LanguageSwitcher } from '@ui/LanguageSwitcher';
import { GameDimensions } from '@utils/Constants';
import { DesignSystem as DS } from '@utils/DesignSystem';
import { i18n } from '@utils/i18n';

/**
 * ZONA - NEON VOID Menu Scene
 * Karanlık boşlukta neon estetik
 */
export class MenuScene extends BaseScene {
  private titleText!: Text;
  private titleGlow!: Graphics;
  private subtitle!: Text;
  private startButton!: Button;
  private langSwitcher!: LanguageSwitcher;
  private versionText!: Text;
  private grid!: Graphics;
  private particles: Array<{ x: number; y: number; vy: number; graphic: Graphics }> = [];
  private glowPhase: number = 0;

  constructor(app: PIXIApplication, sceneManager: SceneManager) {
    super(app, sceneManager, 'menu');
    
    // Subscribe to language changes
    i18n.onLanguageChange(() => this.updateTexts());
  }

  protected onCreate(): void {
    // Animated gradient background (deep void) - Design System
    const background = new Graphics();
    const gradient = new FillGradient(0, 0, 0, GameDimensions.GAME_HEIGHT);
    gradient.addColorStop(0, DS.colors.background.primary);
    gradient.addColorStop(1, DS.colors.background.secondary);
    background.rect(0, 0, GameDimensions.GAME_WIDTH, GameDimensions.GAME_HEIGHT);
    background.fill(gradient);
    this.container.addChild(background);

    // Animated grid
    this.createAnimatedGrid();

    // Floating particles
    this.createParticles();

    // Logo background glow - Design System
    this.titleGlow = new Graphics();
    this.titleGlow.circle(0, 0, 150);
    this.titleGlow.fill({ color: DS.colors.neon.purple, alpha: DS.effects.alpha.light });
    this.titleGlow.position.set(DS.layout.screen.centerX, DS.layout.positions.titleY);
    this.container.addChild(this.titleGlow);

    // ZONA Logo - Design System preset
    this.titleText = new Text({
      text: i18n.t('menu.title'),
      style: {
        ...DS.presets.text.title,
        fill: DS.colors.background.primary,
        stroke: { color: DS.colors.neon.cyan, width: 6 },
        dropShadow: {
          alpha: DS.effects.alpha.solid,
          angle: 0,
          blur: DS.effects.shadow.lg.blur,
          color: DS.colors.neon.cyan,
          distance: 0,
        },
      }
    });
    this.titleText.anchor.set(0.5);
    this.titleText.position.set(DS.layout.screen.centerX, DS.layout.positions.titleY);
    this.container.addChild(this.titleText);

    // Outer glow for title - Design System
    const titleGlowText = new Text({
      text: i18n.t('menu.title'),
      style: {
        ...DS.presets.text.title,
        fill: 0x000000,
        stroke: { color: DS.colors.neon.purple, width: 12, alpha: DS.effects.alpha.heavy },
        dropShadow: {
          alpha: DS.effects.shadow.lg.alpha,
          angle: 0,
          blur: 50,
          color: DS.colors.neon.purple,
          distance: 0,
        },
      }
    });
    titleGlowText.anchor.set(0.5);
    titleGlowText.position.set(DS.layout.screen.centerX, DS.layout.positions.titleY);
    titleGlowText.alpha = 0.8;
    this.container.addChild(titleGlowText);
    this.container.addChild(this.titleText); // Re-add to be on top

    // Subtitle - Design System preset
    this.subtitle = new Text({
      text: i18n.t('menu.subtitle'),
      style: DS.presets.text.subtitle
    });
    this.subtitle.anchor.set(0.5);
    this.subtitle.position.set(DS.layout.screen.centerX, DS.layout.positions.titleY + 80);
    this.container.addChild(this.subtitle);

    // Hexagon decorations around title
    this.createHexagonPattern();

    // Start button - Design System preset
    const buttonPreset = DS.presets.button.primary;
    this.startButton = new Button({
      text: i18n.t('menu.startGame'),
      width: DS.sizes.button.lg.width,
      height: DS.sizes.button.lg.height,
      backgroundColor: buttonPreset.backgroundColor,
      textColor: buttonPreset.textColor,
      fontSize: buttonPreset.fontSize,
      borderRadius: buttonPreset.borderRadius,
      onClick: () => this.onStartClick()
    });
    this.startButton.position.set(DS.layout.screen.centerX, DS.layout.positions.buttonStartY);
    this.container.addChild(this.startButton);

    // Language switcher - Top right
    this.langSwitcher = new LanguageSwitcher();
    this.langSwitcher.position.set(GameDimensions.GAME_WIDTH - 140, DS.layout.positions.hudPadding);
    this.container.addChild(this.langSwitcher);

    // Version text - Design System
    this.versionText = new Text({
      text: i18n.t('common.version'),
      style: DS.presets.text.caption
    });
    this.versionText.position.set(DS.layout.positions.hudPadding, GameDimensions.GAME_HEIGHT - 30);
    this.container.addChild(this.versionText);

    console.log('🎮 ZONA Menu - NEON VOID theme loaded');
  }

  /**
   * Animated grid background - Design System
   */
  private createAnimatedGrid(): void {
    this.grid = new Graphics();
    
    // Vertical lines
    for (let x = 0; x < GameDimensions.GAME_WIDTH; x += 50) {
      this.grid.moveTo(x, 0);
      this.grid.lineTo(x, GameDimensions.GAME_HEIGHT);
    }
    
    // Horizontal lines
    for (let y = 0; y < GameDimensions.GAME_HEIGHT; y += 50) {
      this.grid.moveTo(0, y);
      this.grid.lineTo(GameDimensions.GAME_WIDTH, y);
    }
    
    this.grid.stroke({ 
      color: DS.colors.neon.cyan, 
      width: 0.5, 
      alpha: DS.effects.alpha.light 
    });
    this.container.addChildAt(this.grid, DS.layout.zIndex.grid);
  }

  /**
   * Floating particles effect - Design System
   */
  private createParticles(): void {
    for (let i = 0; i < 20; i++) {
      const particle = new Graphics();
      particle.circle(0, 0, Math.random() * 2 + 1);
      particle.fill({ 
        color: DS.colors.neon.cyan, 
        alpha: Math.random() * 0.5 + 0.2 
      });
      
      const x = Math.random() * GameDimensions.GAME_WIDTH;
      const y = Math.random() * GameDimensions.GAME_HEIGHT;
      const vy = -(Math.random() * 0.5 + 0.2);
      
      particle.position.set(x, y);
      this.container.addChildAt(particle, DS.layout.zIndex.grid);
      
      this.particles.push({ x, y, vy, graphic: particle });
    }
  }

  /**
   * Hexagon pattern around title
   */
  private createHexagonPattern(): void {
    const hexSize = 30;
    const positions = [
      { x: -200, y: -50 },
      { x: 200, y: -50 },
      { x: -220, y: 50 },
      { x: 220, y: 50 },
    ];

    for (const pos of positions) {
      const hex = this.createHexagon(hexSize);
      hex.position.set(GameDimensions.GAME_WIDTH / 2 + pos.x, DS.layout.positions.titleY + pos.y);
      this.container.addChild(hex);
    }
  }

  /**
   * Create hexagon shape - Design System
   */
  private createHexagon(size: number): Graphics {
    const hex = new Graphics();
    const points: number[] = [];
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(Math.cos(angle) * size, Math.sin(angle) * size);
    }
    
    hex.poly(points);
    hex.stroke({ 
      color: DS.colors.neon.cyan, 
      width: DS.effects.border.normal, 
      alpha: 0.4 
    });
    
    return hex;
  }

  protected onUpdate(deltaTime: number): void {
    const time = Date.now();
    
    // Title pulse animation
    this.glowPhase += deltaTime / 1000;
    const pulse = Math.sin(this.glowPhase * 2) * 0.1 + 1;
    this.titleGlow.scale.set(pulse);
    this.titleGlow.alpha = 0.15 + Math.sin(this.glowPhase * 2) * 0.05;

    // Title subtle float - Design System position
    this.titleText.y = DS.layout.positions.titleY + Math.sin(time / 1000) * 5;
    
    // Subtitle fade animation
    this.subtitle.alpha = 0.6 + Math.sin(time / 800) * 0.2;

    // Animate particles
    for (const particle of this.particles) {
      particle.y += particle.vy;
      
      // Reset particle when it goes off screen
      if (particle.y < -10) {
        particle.y = GameDimensions.GAME_HEIGHT + 10;
        particle.x = Math.random() * GameDimensions.GAME_WIDTH;
      }
      
      particle.graphic.position.set(particle.x, particle.y);
      particle.graphic.alpha = 0.3 + Math.sin(time / 500 + particle.x) * 0.2;
    }
  }

  private onStartClick(): void {
    console.log('🎮 Starting ZONA...');
    this.sceneManager.changeScene('game');
  }

  /**
   * Update texts when language changes
   */
  private updateTexts(): void {
    this.titleText.text = i18n.t('menu.title');
    this.subtitle.text = i18n.t('menu.subtitle');
    this.startButton.setText(i18n.t('menu.startGame'));
    this.versionText.text = i18n.t('common.version');
  }

  protected onDestroy(): void {
    // Cleanup particles
    this.particles = [];
  }
}

