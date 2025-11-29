/**
 * ZONA - i18n Index
 * Çoklu dil sistemi export dosyası
 */

export { LanguageManager, i18n, type Language, type TranslationKeys } from './LanguageManager';
export { tr } from './translations/tr';
export { en } from './translations/en';
export { AVAILABLE_LANGUAGES, getLanguageConfig, getAvailableLanguageCodes, type LanguageConfig } from './languageConfig';

// Initialize translations
import { i18n } from './LanguageManager';
import { tr } from './translations/tr';
import { en } from './translations/en';

i18n.registerTranslation('tr', tr);
i18n.registerTranslation('en', en);

