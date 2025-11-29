import { Text, Graphics } from 'pixi.js';
import type { Application as PIXIApplication } from 'pixi.js';
import type { SceneManager } from '@core/SceneManager';
import { BaseScene } from './BaseScene';
import { Button } from '@ui/Button';
import { GAME_WIDTH, GAME_HEIGHT } from '@utils/Constants';

/**
 * Game Over sahnesi
 * Skor gösterimi ve restart
 */
export class GameOverScene extends BaseScene {
  private gameOverText!: Text;
  private restartButton!: Button;
  private menuButton!: Button;

  constructor(app: PIXIApplication, sceneManager: SceneManager) {
    super(app, sceneManager, 'gameover');
  }

  protected onCreate(): void {
    // Arka plan
    const background = new Graphics();
    background.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    background.fill(0x2d1b2e);
    this.container.addChild(background);

    // Game Over yazısı
    this.gameOverText = new Text({
      text: 'GAME OVER',
      style: {
        fontFamily: 'Arial',
        fontSize: 60,
        fontWeight: 'bold',
        fill: 0xff4757,
      }
    });
    this.gameOverText.anchor.set(0.5);
    this.gameOverText.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 3);
    this.container.addChild(this.gameOverText);

    // Restart butonu
    this.restartButton = new Button({
      text: 'RESTART',
      width: 180,
      height: 50,
      backgroundColor: 0x16c79a,
      textColor: 0xffffff,
      onClick: () => this.onRestartClick()
    });
    this.restartButton.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.container.addChild(this.restartButton);

    // Menu butonu
    this.menuButton = new Button({
      text: 'MAIN MENU',
      width: 180,
      height: 50,
      backgroundColor: 0x2e86ab,
      textColor: 0xffffff,
      onClick: () => this.onMenuClick()
    });
    this.menuButton.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 70);
    this.container.addChild(this.menuButton);

    console.log('💀 GameOver scene created');
  }

  protected onUpdate(deltaTime: number): void {
    // Animasyon (opsiyonel)
  }

  private onRestartClick(): void {
    console.log('🔄 Restarting game...');
    this.sceneManager.changeScene('game');
  }

  private onMenuClick(): void {
    console.log('🏠 Returning to menu...');
    this.sceneManager.changeScene('menu');
  }

  protected onDestroy(): void {
    // Cleanup
  }
}

