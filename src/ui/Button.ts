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
   * Modern buton görselini oluştur - NEON VOID theme
   */
  private createButton(): void {
    const { width, height, backgroundColor, textColor, text, fontSize, borderRadius } = this.options;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Outer glow (neon effect)
    const outerGlow = new Graphics();
    outerGlow.roundRect(-halfWidth - 2, -halfHeight - 2, width + 4, height + 4, borderRadius! + 2);
    outerGlow.fill({ color: 0x00d9ff, alpha: 0.2 });
    this.addChild(outerGlow);

    // Ana arka plan (gradient ile)
    this.background = new Graphics();
    
    // Gradient oluştur (dark theme için)
    const gradient = new FillGradient(0, -halfHeight, 0, halfHeight);
    gradient.addColorStop(0, 0x16213e); // Dark blue-grey
    gradient.addColorStop(1, 0x1a2a4a); // Slightly lighter

    // Rounded rectangle çiz
    this.background.roundRect(-halfWidth, -halfHeight, width, height, borderRadius!);
    this.background.fill(gradient);
    
    // Neon border (cyan glow)
    this.background.roundRect(-halfWidth, -halfHeight, width, height, borderRadius!);
    this.background.stroke({ 
      color: 0x00d9ff, 
      width: 2,
      alpha: 0.8
    });
    
    this.addChild(this.background);

    // İç glow efekti (top highlight)
    const innerGlow = new Graphics();
    innerGlow.roundRect(-halfWidth + 4, -halfHeight + 4, width - 8, height / 3, borderRadius! - 2);
    innerGlow.fill({ color: 0x00d9ff, alpha: 0.1 });
    this.addChild(innerGlow);

    // Text label with neon glow
    this.label = new Text({
      text: text,
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: fontSize,
        fontWeight: 'bold',
        fill: 0xffffff,
        dropShadow: {
          alpha: 0.8,
          angle: 0,
          blur: 8,
          color: 0x00d9ff,
          distance: 0,
        },
      }
    });
    this.label.anchor.set(0.5);
    this.label.y = 1;
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
   * Mouse butona basıldığında - Neon flash effect
   */
  private onButtonDown(): void {
    this.isPressed = true;
    this.background.tint = 0xdddddd;
    this.label.y = 2;
  }

  /**
   * Mouse bırakıldığında (tıklama tamamlandı)
   */
  private onButtonUp(): void {
    if (this.isPressed) {
      this.options.onClick();
      this.isPressed = false;
      
      if (this.isHovered) {
        this.background.tint = 0xffffff;
      } else {
        this.background.tint = 0xeeeeee;
      }
      this.label.y = 1;
    }
  }

  /**
   * Mouse butona geldiğinde - Neon glow intensify
   */
  private onButtonHover(): void {
    this.isHovered = true;
    if (!this.isPressed) {
      this.background.tint = 0xffffff;
      // Neon border glow intensify
      this.children[0].alpha = 0.4; // outer glow
    }
  }

  /**
   * Mouse butondan ayrıldığında
   */
  private onButtonOut(): void {
    this.isHovered = false;
    this.isPressed = false;
    this.background.tint = 0xeeeeee;
    this.label.y = 1;
    this.children[0].alpha = 0.2; // outer glow normal
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

