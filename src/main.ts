import { Application } from './core/Application';
import './utils/Constants';

/**
 * Ana entry point
 * Uygulamayı başlatır
 */
async function main() {
  try {
    console.log('🚀 Starting ZONA...');
    
    const app = new Application();
    await app.init();
    
    // Global erişim için (debug amaçlı)
    (window as any).app = app;
    
  } catch (error) {
    console.error('❌ Failed to initialize ZONA:', error);
  }
}

// Uygulamayı başlat
main();

