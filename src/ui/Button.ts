import { Container, Graphics, Text } from 'pixi.js';

export interface ButtonOptions {
  text: string;
  width: number;
  height: number;
  backgroundColor: number;
  textColor: number;
  onClick: () => void;
}

/**
 * Yeniden kullanılabilir buton component'i
 */
export class Button extends Container {
  private background!: Graphics;
  private label!: Text;
  private options: ButtonOptions;

  constructor(options: ButtonOptions) {
    super();
    this.options = options;
    this.createButton();
    this.setupInteractivity();
  }

  /**
   * Buton görselini oluştur
   */
  private createButton(): void {
    // Arka plan
    this.background = new Graphics();
    this.background.rect(
      -this.options.width / 2,
      -this.options.height / 2,
      this.options.width,
      this.options.height
    );
    this.background.fill(this.options.backgroundColor);
    this.addChild(this.background);

    // Label
    this.label = new Text({
      text: this.options.text,
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fontWeight: 'bold',
        fill: this.options.textColor,
      }
    });
    this.label.anchor.set(0.5);
    this.addChild(this.label);
  }

  /**
   * İnteraktivite ayarla
   */
  private setupInteractivity(): void {
    this.eventMode = 'static';
    this.cursor = 'pointer';

    this.on('pointerdown', this.onButtonClick.bind(this));
    this.on('pointerover', this.onButtonHover.bind(this));
    this.on('pointerout', this.onButtonOut.bind(this));
  }

  /**
   * Buton tıklandığında
   */
  private onButtonClick(): void {
    this.options.onClick();
  }

  /**
   * Mouse butona geldiğinde
   */
  private onButtonHover(): void {
    this.scale.set(1.05);
  }

  /**
   * Mouse butondan ayrıldığında
   */
  private onButtonOut(): void {
    this.scale.set(1.0);
  }

  /**
   * Buton metnini değiştir
   */
  public setText(text: string): void {
    this.label.text = text;
  }
}

