import { Container, Text } from 'pixi.js';
import { GAME_WIDTH } from '@utils/Constants';

/**
 * HUD (Heads-Up Display)
 * Skor, can barı gibi UI elementleri
 */
export class HUD extends Container {
  private scoreText!: Text;
  private score: number = 0;

  constructor() {
    super();
    this.createHUD();
  }

  /**
   * HUD elementlerini oluştur
   */
  private createHUD(): void {
    // Skor
    this.scoreText = new Text({
      text: 'Score: 0',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffffff,
      }
    });
    this.scoreText.position.set(20, 20);
    this.addChild(this.scoreText);
  }

  /**
   * Skoru güncelle
   */
  public setScore(score: number): void {
    this.score = score;
    this.scoreText.text = `Score: ${this.score}`;
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

