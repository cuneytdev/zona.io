import { Container, Graphics, Text, FillGradient } from 'pixi.js';

export interface ButtonOptions {
  text: string;
  width: number;
  height: number;
  backgroundColor: number;
  textColor: number;
  onClick: () => void;
  fontSize?: number;
  borderRadius?: number;
}

/**
 * Modern, şık buton component'i
 * Gradient, gölge ve smooth animasyonlar ile
 */
export class Button extends Container {
  private background!: Graphics;
  private shadow!: Graphics;
  private label!: Text;
  private options: ButtonOptions;
  private isHovered: boolean = false;
  private isPressed: boolean = false;

  constructor(options: ButtonOptions) {
    super();
    this.options = {
      fontSize: 20,
      borderRadius: 12,
      ...options
    };
    this.createButton();
    this.setupInteractivity();
  }

  /**
   * Modern buton görselini oluştur
   */
  private createButton(): void {
    const { width, height, backgroundColor, textColor, text, fontSize, borderRadius } = this.options;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Gölge (depth efekti için)
    this.shadow = new Graphics();
    this.shadow.roundRect(-halfWidth, -halfHeight + 4, width, height, borderRadius!);
    this.shadow.fill({ color: 0x000000, alpha: 0.3 });
    this.addChild(this.shadow);

    // Ana arka plan (gradient ile)
    this.background = new Graphics();
    
    // Gradient oluştur (yukarıdan aşağıya)
    const gradient = new FillGradient(0, -halfHeight, 0, halfHeight);
    const lightColor = this.lightenColor(backgroundColor, 0.2);
    const darkColor = this.darkenColor(backgroundColor, 0.1);
    
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(1, darkColor);

    // Rounded rectangle çiz
    this.background.roundRect(-halfWidth, -halfHeight, width, height, borderRadius!);
    this.background.fill(gradient);
    
    // Border/outline ekle
    this.background.roundRect(-halfWidth, -halfHeight, width, height, borderRadius!);
    this.background.stroke({ 
      color: this.lightenColor(backgroundColor, 0.4), 
      width: 2,
      alpha: 0.6
    });
    
    this.addChild(this.background);

    // İç glow efekti
    const innerGlow = new Graphics();
    innerGlow.roundRect(-halfWidth + 2, -halfHeight + 2, width - 4, height / 3, borderRadius! - 2);
    innerGlow.fill({ color: 0xffffff, alpha: 0.15 });
    this.addChild(innerGlow);

    // Text label
    this.label = new Text({
      text: text,
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: fontSize,
        fontWeight: 'bold',
        fill: textColor,
        dropShadow: {
          alpha: 0.5,
          angle: Math.PI / 2,
          blur: 2,
          color: 0x000000,
          distance: 2,
        },
      }
    });
    this.label.anchor.set(0.5);
    this.label.y = 1; // Hafif aşağı kaydır (depth hissi)
    this.addChild(this.label);
  }

  /**
   * İnteraktivite ayarla
   */
  private setupInteractivity(): void {
    this.eventMode = 'static';
    this.cursor = 'pointer';

    this.on('pointerdown', this.onButtonDown.bind(this));
    this.on('pointerup', this.onButtonUp.bind(this));
    this.on('pointerupoutside', this.onButtonUp.bind(this));
    this.on('pointerover', this.onButtonHover.bind(this));
    this.on('pointerout', this.onButtonOut.bind(this));
  }

  /**
   * Mouse butona basıldığında
   */
  private onButtonDown(): void {
    this.isPressed = true;
    this.background.tint = 0xcccccc; // Hafif koyulaştır
    this.shadow.alpha = 0.5;
    this.label.y = 2; // Sadece text'i hafif aşağı kaydır
  }

  /**
   * Mouse bırakıldığında (tıklama tamamlandı)
   */
  private onButtonUp(): void {
    if (this.isPressed) {
      this.options.onClick();
      this.isPressed = false;
      
      if (this.isHovered) {
        this.background.tint = 0xffffff; // Parlak
      } else {
        this.background.tint = 0xeeeeee; // Normal
      }
      this.shadow.alpha = 1.0;
      this.label.y = 1;
    }
  }

  /**
   * Mouse butona geldiğinde
   */
  private onButtonHover(): void {
    this.isHovered = true;
    if (!this.isPressed) {
      this.background.tint = 0xffffff; // Parla
      this.shadow.alpha = 1.2; // Gölgeyi belirginleştir
    }
  }

  /**
   * Mouse butondan ayrıldığında
   */
  private onButtonOut(): void {
    this.isHovered = false;
    this.isPressed = false;
    this.background.tint = 0xeeeeee; // Normal ton
    this.shadow.alpha = 1.0;
    this.label.y = 1;
  }

  /**
   * Rengi aydınlat
   */
  private lightenColor(color: number, amount: number): number {
    const r = ((color >> 16) & 0xff) + Math.floor(255 * amount);
    const g = ((color >> 8) & 0xff) + Math.floor(255 * amount);
    const b = (color & 0xff) + Math.floor(255 * amount);
    
    return (Math.min(255, r) << 16) | (Math.min(255, g) << 8) | Math.min(255, b);
  }

  /**
   * Rengi koyulaştır
   */
  private darkenColor(color: number, amount: number): number {
    const r = ((color >> 16) & 0xff) - Math.floor(255 * amount);
    const g = ((color >> 8) & 0xff) - Math.floor(255 * amount);
    const b = (color & 0xff) - Math.floor(255 * amount);
    
    return (Math.max(0, r) << 16) | (Math.max(0, g) << 8) | Math.max(0, b);
  }

  /**
   * Buton metnini değiştir
   */
  public setText(text: string): void {
    this.label.text = text;
  }
}

