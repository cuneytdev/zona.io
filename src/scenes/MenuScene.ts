import { Text, Graphics } from 'pixi.js';
import type { Application as PIXIApplication } from 'pixi.js';
import type { SceneManager } from '@core/SceneManager';
import { BaseScene } from './BaseScene';
import { Button } from '@ui/Button';
import { GAME_WIDTH, GAME_HEIGHT } from '@utils/Constants';

/**
 * Ana menü sahnesi
 * Oyun başlatma ve ayarlar
 */
export class MenuScene extends BaseScene {
  private titleText!: Text;
  private startButton!: Button;

  constructor(app: PIXIApplication, sceneManager: SceneManager) {
    super(app, sceneManager, 'menu');
  }

  protected onCreate(): void {
    // Arka plan
    const background = new Graphics();
    background.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    background.fill(0x0f3460);
    this.container.addChild(background);

    // Başlık
    this.titleText = new Text({
      text: 'ZONA',
      style: {
        fontFamily: 'Arial',
        fontSize: 80,
        fontWeight: 'bold',
        fill: 0xffffff,
      }
    });
    this.titleText.anchor.set(0.5);
    this.titleText.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 3);
    this.container.addChild(this.titleText);

    // Start butonu
    this.startButton = new Button({
      text: 'START GAME',
      width: 200,
      height: 60,
      backgroundColor: 0x16c79a,
      textColor: 0xffffff,
      onClick: () => this.onStartClick()
    });
    this.startButton.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.container.addChild(this.startButton);

    console.log('📋 Menu scene created');
  }

  protected onUpdate(deltaTime: number): void {
    // Basit animasyon: başlık yavaşça yukarı-aşağı hareket
    this.titleText.y = (GAME_HEIGHT / 3) + Math.sin(Date.now() / 500) * 10;
  }

  private onStartClick(): void {
    console.log('🎮 Starting game...');
    this.sceneManager.changeScene('game');
  }

  protected onDestroy(): void {
    // Cleanup if needed
  }
}

