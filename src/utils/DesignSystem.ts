/**
 * ZONA - NEON VOID Design System
 * Tüm oyun genelinde kullanılacak merkezi tasarım sistemi
 */

export const DesignSystem = {
  /**
   * 🎨 COLOR PALETTE
   */
  colors: {
    // Background
    background: {
      primary: 0x0a0e27,      // Deep void navy
      secondary: 0x16213e,    // Dark blue-grey
      tertiary: 0x1a2a4a,     // Slightly lighter
    },
    
    // Neon Colors
    neon: {
      cyan: 0x00d9ff,         // Primary neon (Electric cyan)
      purple: 0x7b2cbf,       // Secondary neon (Electric purple)
      pink: 0xff006e,         // Danger neon (Hot pink)
      green: 0x06ffa5,        // Success neon (Mint green)
      yellow: 0xffbe0b,       // Warning neon (Electric yellow)
    },
    
    // UI Colors
    ui: {
      textPrimary: 0xffffff,     // Pure white
      textSecondary: 0x8b9dc3,   // Muted blue-grey
      textDisabled: 0x4a5568,    // Darker grey
      border: 0x00d9ff,          // Cyan glow
      borderDark: 0x1a2a4a,      // Dark border
    },
    
    // Entity Colors
    entity: {
      player: 0x06ffa5,          // Mint green
      playerGlow: 0x00d9ff,      // Cyan
      enemy: 0xff006e,           // Hot pink
      enemyGlow: 0x7b2cbf,       // Purple
      trace: 0x00d9ff,           // Cyan
      claimedArea: 0x7b2cbf,     // Purple
    },
    
    // State Colors
    state: {
      success: 0x06ffa5,
      warning: 0xffbe0b,
      danger: 0xff006e,
      info: 0x00d9ff,
    }
  },

  /**
   * 📝 TYPOGRAPHY
   */
  typography: {
    // Font Families
    fontFamily: {
      primary: 'Arial, sans-serif',
      bold: 'Arial Black, Arial, sans-serif',
      mono: 'Courier New, Consolas, monospace',
    },
    
    // Font Sizes
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 20,
      xl: 24,
      '2xl': 32,
      '3xl': 48,
      '4xl': 64,
      '5xl': 80,
      huge: 120,
    },
    
    // Font Weights
    fontWeight: {
      normal: 'normal',
      bold: 'bold',
      heavy: '900',
    },
    
    // Letter Spacing
    letterSpacing: {
      tight: -1,
      normal: 0,
      wide: 8,
      wider: 15,
      widest: 20,
    }
  },

  /**
   * 📏 SPACING
   */
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 96,
  },

  /**
   * 🔲 SIZES
   */
  sizes: {
    button: {
      sm: { width: 150, height: 45 },
      md: { width: 200, height: 55 },
      lg: { width: 250, height: 65 },
    },
    entity: {
      player: 60,
      enemy: 50,
      powerup: 30,
    }
  },

  /**
   * 🎭 EFFECTS
   */
  effects: {
    // Glow settings
    glow: {
      low: { distance: 8, strength: 1.5 },
      mid: { distance: 15, strength: 2.5 },
      high: { distance: 20, strength: 3.0 },
    },
    
    // Shadow settings
    shadow: {
      sm: { blur: 4, distance: 2, alpha: 0.3 },
      md: { blur: 8, distance: 4, alpha: 0.4 },
      lg: { blur: 30, distance: 0, alpha: 0.8 },
    },
    
    // Border settings
    border: {
      thin: 1,
      normal: 2,
      thick: 3,
    },
    
    // Border radius
    radius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
    
    // Alpha values
    alpha: {
      transparent: 0,
      light: 0.1,
      medium: 0.3,
      heavy: 0.6,
      solid: 1.0,
    }
  },

  /**
   * ⏱️ ANIMATIONS
   */
  animations: {
    // Duration (milliseconds)
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    
    // Easing (for reference)
    easing: {
      linear: 'linear',
      easeIn: 'easeIn',
      easeOut: 'easeOut',
      easeInOut: 'easeInOut',
    },
    
    // Pulse settings
    pulse: {
      slow: 2000,    // 2s
      normal: 1000,  // 1s
      fast: 500,     // 0.5s
    }
  },

  /**
   * 📐 LAYOUT
   */
  layout: {
    // Screen positions (dynamic - will be updated)
    get screen() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return {
        centerX: width / 2,
        centerY: height / 2,
        width: width,
        height: height,
      };
    },
    
    // Z-index layers
    zIndex: {
      background: 0,
      grid: 1,
      claimedArea: 2,
      trace: 3,
      entities: 4,
      particles: 5,
      ui: 6,
      modal: 7,
    },
    
    // Common positions (dynamic)
    get positions() {
      const height = window.innerHeight;
      return {
        titleY: height / 3,
        buttonStartY: height / 2 + 100,
        hudPadding: 20,
      };
    }
  },

  /**
   * 🎮 UI Components Presets
   */
  presets: {
    button: {
      primary: {
        backgroundColor: 0x16213e,
        textColor: 0xffffff,
        borderColor: 0x00d9ff,
        fontSize: 22,
        borderRadius: 16,
      },
      secondary: {
        backgroundColor: 0x1a2a4a,
        textColor: 0x8b9dc3,
        borderColor: 0x7b2cbf,
        fontSize: 20,
        borderRadius: 12,
      },
      danger: {
        backgroundColor: 0x2d1b2e,
        textColor: 0xffffff,
        borderColor: 0xff006e,
        fontSize: 20,
        borderRadius: 12,
      },
      success: {
        backgroundColor: 0x16213e,
        textColor: 0xffffff,
        borderColor: 0x06ffa5,
        fontSize: 20,
        borderRadius: 12,
      }
    },
    
    text: {
      title: {
        fontFamily: 'Arial Black, Arial, sans-serif',
        fontSize: 120,
        fontWeight: '900',
        fill: 0x0a0e27,
        stroke: { color: 0x00d9ff, width: 6 },
        letterSpacing: 15,
      },
      subtitle: {
        fontFamily: 'Courier New, monospace',
        fontSize: 20,
        fontWeight: 'bold',
        fill: 0x8b9dc3,
        letterSpacing: 8,
      },
      body: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 18,
        fill: 0xffffff,
      },
      caption: {
        fontFamily: 'Courier New, monospace',
        fontSize: 14,
        fill: 0x8b9dc3,
      }
    }
  }
} as const;

/**
 * 🎨 Helper Functions
 */
export const DesignHelpers = {
  /**
   * Rengi aydınlat
   */
  lightenColor(color: number, amount: number): number {
    const r = ((color >> 16) & 0xff) + Math.floor(255 * amount);
    const g = ((color >> 8) & 0xff) + Math.floor(255 * amount);
    const b = (color & 0xff) + Math.floor(255 * amount);
    
    return (Math.min(255, r) << 16) | (Math.min(255, g) << 8) | Math.min(255, b);
  },

  /**
   * Rengi koyulaştır
   */
  darkenColor(color: number, amount: number): number {
    const r = ((color >> 16) & 0xff) - Math.floor(255 * amount);
    const g = ((color >> 8) & 0xff) - Math.floor(255 * amount);
    const b = (color & 0xff) - Math.floor(255 * amount);
    
    return (Math.max(0, r) << 16) | (Math.max(0, g) << 8) | Math.max(0, b);
  },

  /**
   * Alpha ile renk
   */
  colorWithAlpha(color: number, alpha: number): { color: number; alpha: number } {
    return { color, alpha };
  }
};

