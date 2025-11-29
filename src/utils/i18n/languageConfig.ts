/**
 * ZONA - Language Configuration
 * Dil seçenekleri ve ayarları
 */

import type { Language } from './LanguageManager';

export interface LanguageConfig {
  code: Language;
  flag: string;
  name: string;
  nativeName: string;
}

/**
 * Mevcut dil seçenekleri
 * Yeni dil eklemek için buraya ekleyin
 */
export const AVAILABLE_LANGUAGES: LanguageConfig[] = [
  {
    code: 'tr',
    flag: '🇹🇷',
    name: 'Turkish',
    nativeName: 'Türkçe',
  },
  {
    code: 'en',
    flag: '🇬🇧',
    name: 'English',
    nativeName: 'English',
  },
  // Yeni diller buraya eklenebilir:
  // {
  //   code: 'de',
  //   flag: '🇩🇪',
  //   name: 'German',
  //   nativeName: 'Deutsch',
  // },
  // {
  //   code: 'fr',
  //   flag: '🇫🇷',
  //   name: 'French',
  //   nativeName: 'Français',
  // },
  // {
  //   code: 'es',
  //   flag: '🇪🇸',
  //   name: 'Spanish',
  //   nativeName: 'Español',
  // },
  // {
  //   code: 'ru',
  //   flag: '🇷🇺',
  //   name: 'Russian',
  //   nativeName: 'Русский',
  // },
  // {
  //   code: 'ja',
  //   flag: '🇯🇵',
  //   name: 'Japanese',
  //   nativeName: '日本語',
  // },
  // {
  //   code: 'pt',
  //   flag: '🇵🇹',
  //   name: 'Portuguese',
  //   nativeName: 'Português',
  // },
  // {
  //   code: 'zh',
  //   flag: '🇨🇳',
  //   name: 'Chinese',
  //   nativeName: '中文',
  // },
  // {
  //   code: 'ar',
  //   flag: '🇸🇦',
  //   name: 'Arabic',
  //   nativeName: 'العربية',
  // },
  // {
  //   code: 'it',
  //   flag: '🇮🇹',
  //   name: 'Italian',
  //   nativeName: 'Italiano',
  // },
];

/**
 * Get language config by code
 */
export function getLanguageConfig(code: Language): LanguageConfig | undefined {
  return AVAILABLE_LANGUAGES.find(lang => lang.code === code);
}

/**
 * Get all available language codes
 */
export function getAvailableLanguageCodes(): Language[] {
  return AVAILABLE_LANGUAGES.map(lang => lang.code);
}

