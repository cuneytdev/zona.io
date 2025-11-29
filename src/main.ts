import { Application } from './core/Application';
import './utils/Constants';
import './utils/i18n'; // Initialize i18n system
import { i18n } from './utils/i18n';

/**
 * Ana entry point
 * Uygulamayı başlatır
 */
async function main() {
  try {
    console.log(`🚀 Starting ZONA... (${i18n.getLanguageName()})`);
    
    const app = new Application();
    await app.init();
    
    // Global erişim için (debug amaçlı)
    (window as any).app = app;
    (window as any).i18n = i18n; // i18n'yi global'e ekle
    
  } catch (error) {
    console.error('❌ Failed to initialize ZONA:', error);
  }
}

// Uygulamayı başlat
main();

