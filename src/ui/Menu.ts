import { Container, Graphics, Text } from 'pixi.js';

/**
 * Menü sistemi için yeniden kullanılabilir component
 */
export class Menu extends Container {
  private background!: Graphics;
  private titleText!: Text;
  private items: Container[] = [];

  constructor(title: string, width: number = 300, height: number = 400) {
    super();
    this.createMenu(title, width, height);
  }

  /**
   * Menü görselini oluştur
   */
  private createMenu(title: string, width: number, height: number): void {
    // Arka plan
    this.background = new Graphics();
    this.background.rect(-width / 2, -height / 2, width, height);
    this.background.fill(0x2d3436);
    this.background.stroke({ color: 0xffffff, width: 2 });
    this.addChild(this.background);

    // Başlık
    this.titleText = new Text({
      text: title,
      style: {
        fontFamily: 'Arial',
        fontSize: 28,
        fontWeight: 'bold',
        fill: 0xffffff,
      }
    });
    this.titleText.anchor.set(0.5);
    this.titleText.position.set(0, -height / 2 + 40);
    this.addChild(this.titleText);
  }

  /**
   * Menüye item ekle
   */
  public addItem(item: Container, yOffset: number): void {
    item.position.set(0, yOffset);
    this.addChild(item);
    this.items.push(item);
  }

  /**
   * Tüm itemleri temizle
   */
  public clearItems(): void {
    for (const item of this.items) {
      this.removeChild(item);
      item.destroy();
    }
    this.items = [];
  }
}

