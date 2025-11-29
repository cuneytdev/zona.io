import { Container, Text, Graphics } from 'pixi.js';
import { DesignSystem as DS } from '@utils/DesignSystem';
import { i18n, type Language } from '@utils/i18n';
import { AVAILABLE_LANGUAGES, type LanguageConfig } from '@utils/i18n/languageConfig';

/**
 * ZONA - Language Selector Dropdown
 * Dropdown dil seçici component'i
 */
export class LanguageSwitcher extends Container {
  private background!: Graphics;
  private flagText!: Text;
  private langText!: Text;
  private arrowText!: Text;
  
  // Dropdown menu
  private dropdown!: Container;
  private dropdownBackground!: Graphics;
  private isOpen: boolean = false;

  private readonly buttonWidth = 140;
  private readonly buttonHeight = 45;
  private readonly dropdownItemHeight = 40;

  constructor() {
    super();
    this.createButton();
    this.createDropdown();
    this.setupInteractivity();
    
    // Subscribe to language changes
    i18n.onLanguageChange(() => this.updateDisplay());
  }

  /**
   * Create main button
   */
  private createButton(): void {
    // Background
    this.background = new Graphics();
    this.background.roundRect(0, 0, this.buttonWidth, this.buttonHeight, DS.effects.radius.md);
    this.background.fill({ color: DS.colors.background.secondary, alpha: 0.9 });
    this.background.roundRect(0, 0, this.buttonWidth, this.buttonHeight, DS.effects.radius.md);
    this.background.stroke({ 
      color: DS.colors.neon.purple, 
      width: DS.effects.border.normal,
      alpha: 0.6
    });
    this.addChild(this.background);

    // Flag emoji
    this.flagText = new Text({
      text: this.getCurrentLanguageOption().flag,
      style: {
        fontSize: DS.typography.fontSize.xl,
      }
    });
    this.flagText.anchor.set(0.5);
    this.flagText.position.set(25, this.buttonHeight / 2);
    this.addChild(this.flagText);

    // Language code
    this.langText = new Text({
      text: i18n.getCurrentLanguage().toUpperCase(),
      style: {
        fontFamily: DS.typography.fontFamily.mono,
        fontSize: DS.typography.fontSize.base,
        fontWeight: DS.typography.fontWeight.bold,
        fill: DS.colors.ui.textPrimary,
        dropShadow: {
          alpha: 0.6,
          angle: 0,
          blur: 6,
          color: DS.colors.neon.purple,
          distance: 0,
        },
      }
    });
    this.langText.anchor.set(0.5);
    this.langText.position.set(75, this.buttonHeight / 2);
    this.addChild(this.langText);

    // Arrow down icon
    this.arrowText = new Text({
      text: '▼',
      style: {
        fontSize: DS.typography.fontSize.sm,
        fill: DS.colors.ui.textSecondary,
      }
    });
    this.arrowText.anchor.set(0.5);
    this.arrowText.position.set(this.buttonWidth - 20, this.buttonHeight / 2);
    this.addChild(this.arrowText);
  }

  /**
   * Create dropdown menu
   */
  private createDropdown(): void {
    this.dropdown = new Container();
    this.dropdown.visible = false;
    this.dropdown.position.set(0, this.buttonHeight + 5);
    
    // Dropdown background
    const dropdownHeight = AVAILABLE_LANGUAGES.length * this.dropdownItemHeight;
    this.dropdownBackground = new Graphics();
    this.dropdownBackground.roundRect(0, 0, this.buttonWidth, dropdownHeight, DS.effects.radius.md);
    this.dropdownBackground.fill({ color: DS.colors.background.secondary, alpha: 0.95 });
    this.dropdownBackground.roundRect(0, 0, this.buttonWidth, dropdownHeight, DS.effects.radius.md);
    this.dropdownBackground.stroke({ 
      color: DS.colors.neon.purple, 
      width: DS.effects.border.normal,
      alpha: 0.6
    });
    this.dropdown.addChild(this.dropdownBackground);

    // Create language items
    AVAILABLE_LANGUAGES.forEach((option, index) => {
      this.createDropdownItem(option, index);
    });

    this.addChild(this.dropdown);
  }

  /**
   * Create single dropdown item
   */
  private createDropdownItem(option: LanguageConfig, index: number): void {
    const itemContainer = new Container();
    itemContainer.position.set(0, index * this.dropdownItemHeight);

    // Item background (for hover)
    const itemBg = new Graphics();
    itemBg.rect(0, 0, this.buttonWidth, this.dropdownItemHeight);
    itemBg.fill({ color: 0x000000, alpha: 0 });
    itemContainer.addChild(itemBg);

    // Flag
    const flag = new Text({
      text: option.flag,
      style: {
        fontSize: DS.typography.fontSize.lg,
      }
    });
    flag.position.set(15, this.dropdownItemHeight / 2);
    flag.anchor.set(0, 0.5);
    itemContainer.addChild(flag);

    // Language name
    const name = new Text({
      text: option.nativeName,
      style: {
        fontFamily: DS.typography.fontFamily.primary,
        fontSize: DS.typography.fontSize.base,
        fill: DS.colors.ui.textPrimary,
      }
    });
    name.position.set(50, this.dropdownItemHeight / 2);
    name.anchor.set(0, 0.5);
    itemContainer.addChild(name);

    // Selected indicator
    if (option.code === i18n.getCurrentLanguage()) {
      const check = new Text({
        text: '✓',
        style: {
          fontSize: DS.typography.fontSize.base,
          fill: DS.colors.neon.green,
        }
      });
      check.position.set(this.buttonWidth - 20, this.dropdownItemHeight / 2);
      check.anchor.set(0.5);
      itemContainer.addChild(check);
    }

    // Interactivity
    itemContainer.eventMode = 'static';
    itemContainer.cursor = 'pointer';
    
    itemContainer.on('pointerover', () => {
      itemBg.clear();
      itemBg.rect(2, 2, this.buttonWidth - 4, this.dropdownItemHeight - 4);
      itemBg.fill({ color: DS.colors.neon.purple, alpha: 0.2 });
    });
    
    itemContainer.on('pointerout', () => {
      itemBg.clear();
      itemBg.rect(0, 0, this.buttonWidth, this.dropdownItemHeight);
      itemBg.fill({ color: 0x000000, alpha: 0 });
    });
    
    itemContainer.on('pointerdown', (event: any) => {
      event.stopPropagation(); // Prevent global click handler
      this.selectLanguage(option.code);
    });

    this.dropdown.addChild(itemContainer);
  }

  /**
   * Setup main button interactivity
   */
  private setupInteractivity(): void {
    this.eventMode = 'static';
    this.cursor = 'pointer';

    this.on('pointerdown', this.toggleDropdown.bind(this));
    this.on('pointerover', this.onHover.bind(this));
    this.on('pointerout', this.onOut.bind(this));
  }

  /**
   * Toggle dropdown visibility
   */
  private toggleDropdown(event: any): void {
    // Stop propagation to prevent closing immediately
    event.stopPropagation();
    
    this.isOpen = !this.isOpen;
    this.dropdown.visible = this.isOpen;
    this.arrowText.text = this.isOpen ? '▲' : '▼';

    if (this.isOpen) {
      // Add global click listener to close dropdown (with small delay)
      setTimeout(() => {
        this.app?.stage.once('pointerdown', (e: any) => {
          // Check if click is outside dropdown
          const clickPos = e.global;
          const bounds = this.dropdown.getBounds();
          
          if (clickPos.x < bounds.x || clickPos.x > bounds.x + bounds.width ||
              clickPos.y < bounds.y || clickPos.y > bounds.y + bounds.height) {
            this.closeDropdown();
          }
        });
      }, 100);
    }
  }

  /**
   * Close dropdown
   */
  private closeDropdown(): void {
    this.isOpen = false;
    this.dropdown.visible = false;
    this.arrowText.text = '▼';
  }

  /**
   * Select language
   */
  private selectLanguage(lang: Language): void {
    i18n.setLanguage(lang);
    this.closeDropdown();
    this.updateDisplay();
  }

  /**
   * Hover effect
   */
  private onHover(): void {
    if (!this.isOpen) {
      this.background.tint = 0xffffff;
    }
  }

  /**
   * Out effect
   */
  private onOut(): void {
    if (!this.isOpen) {
      this.background.tint = 0xeeeeee;
    }
  }

  /**
   * Update display
   */
  private updateDisplay(): void {
    const option = this.getCurrentLanguageOption();
    this.flagText.text = option.flag;
    this.langText.text = option.code.toUpperCase();
    
    // Recreate dropdown to update selected indicator
    this.dropdown.removeChildren();
    const dropdownHeight = AVAILABLE_LANGUAGES.length * this.dropdownItemHeight;
    this.dropdownBackground = new Graphics();
    this.dropdownBackground.roundRect(0, 0, this.buttonWidth, dropdownHeight, DS.effects.radius.md);
    this.dropdownBackground.fill({ color: DS.colors.background.secondary, alpha: 0.95 });
    this.dropdownBackground.roundRect(0, 0, this.buttonWidth, dropdownHeight, DS.effects.radius.md);
    this.dropdownBackground.stroke({ 
      color: DS.colors.neon.purple, 
      width: DS.effects.border.normal,
      alpha: 0.6
    });
    this.dropdown.addChild(this.dropdownBackground);
    
    AVAILABLE_LANGUAGES.forEach((option, index) => {
      this.createDropdownItem(option, index);
    });
  }

  /**
   * Get current language option
   */
  private getCurrentLanguageOption(): LanguageConfig {
    const current = i18n.getCurrentLanguage();
    return AVAILABLE_LANGUAGES.find(opt => opt.code === current) || AVAILABLE_LANGUAGES[0];
  }

  /**
   * Get app reference for global click listener
   */
  private get app() {
    let parent = this.parent;
    while (parent) {
      if ('ticker' in parent) {
        return parent as any;
      }
      parent = parent.parent;
    }
    return null;
  }

  /**
   * Cleanup
   */
  public destroy(options?: any): void {
    this.closeDropdown();
    super.destroy(options);
  }
}

