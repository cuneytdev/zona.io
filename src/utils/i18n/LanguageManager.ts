/**
 * ZONA - Language Manager
 * Çoklu dil desteği için merkezi yönetim sistemi
 */

export type Language = 'tr' | 'en';

export type TranslationKeys = {
  // Common
  common: {
    version: string;
    loading: string;
  };
  
  // Menu
  menu: {
    title: string;
    subtitle: string;
    startGame: string;
    settings: string;
    language: string;
  };
  
  // Game
  game: {
    score: string;
    lives: string;
    level: string;
    paused: string;
    pressEsc: string;
  };
  
  // Game Over
  gameOver: {
    title: string;
    restart: string;
    mainMenu: string;
    yourScore: string;
  };
  
  // Controls
  controls: {
    move: string;
    pause: string;
    back: string;
  };
};

export class LanguageManager {
  private static instance: LanguageManager;
  private currentLanguage: Language = 'tr';
  private translations: Map<Language, any> = new Map();
  private changeCallbacks: Set<(lang: Language) => void> = new Set();

  private constructor() {
    // Load saved language preference
    const saved = localStorage.getItem('zona_language') as Language;
    if (saved && (saved === 'tr' || saved === 'en')) {
      this.currentLanguage = saved;
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      this.currentLanguage = browserLang.startsWith('tr') ? 'tr' : 'en';
    }
  }

  public static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  /**
   * Register translation dictionary
   */
  public registerTranslation(language: Language, translations: any): void {
    this.translations.set(language, translations);
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Set language
   */
  public setLanguage(language: Language): void {
    if (this.currentLanguage === language) return;
    
    this.currentLanguage = language;
    localStorage.setItem('zona_language', language);
    
    // Notify all subscribers
    this.changeCallbacks.forEach(callback => callback(language));
    
    console.log(`🌍 Language changed to: ${language}`);
  }

  /**
   * Toggle between languages
   */
  public toggleLanguage(): void {
    const newLang: Language = this.currentLanguage === 'tr' ? 'en' : 'tr';
    this.setLanguage(newLang);
  }

  /**
   * Get translation by key (supports nested keys with dot notation)
   */
  public t(key: string): string {
    const translation = this.translations.get(this.currentLanguage);
    
    if (!translation) {
      console.warn(`❌ No translations found for language: ${this.currentLanguage}`);
      return key;
    }

    // Support nested keys like "menu.title"
    const keys = key.split('.');
    let value = translation;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`❌ Translation not found for key: ${key}`);
        return key;
      }
    }
    
    return value as string;
  }

  /**
   * Subscribe to language changes
   */
  public onLanguageChange(callback: (lang: Language) => void): void {
    this.changeCallbacks.add(callback);
  }

  /**
   * Unsubscribe from language changes
   */
  public offLanguageChange(callback: (lang: Language) => void): void {
    this.changeCallbacks.delete(callback);
  }

  /**
   * Get language display name
   */
  public getLanguageName(lang?: Language): string {
    const l = lang || this.currentLanguage;
    return l === 'tr' ? 'Türkçe' : 'English';
  }

  /**
   * Get available languages
   */
  public getAvailableLanguages(): Language[] {
    return ['tr', 'en'];
  }
}

// Export singleton instance
export const i18n = LanguageManager.getInstance();

