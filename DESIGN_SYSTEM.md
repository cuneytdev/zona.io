# 🎨 ZONA Design System Documentation

## NEON VOID Theme

Bu doküman, ZONA oyununda kullanılan **Design System**'in detaylı açıklamasını içerir.

---

## 📂 Dosya Konumu

```
src/utils/DesignSystem.ts
```

---

## 🎨 Kullanım

```typescript
import { DesignSystem as DS } from '@utils/DesignSystem';

// Renk kullanımı
background.fill(DS.colors.background.primary);

// Tipografi kullanımı
text.style.fontSize = DS.typography.fontSize.xl;

// Preset kullanımı
const buttonPreset = DS.presets.button.primary;
```

---

## 📐 Yapı

### 1. **Colors (Renkler)**

#### Background
- `primary`: #0a0e27 (Deep void navy)
- `secondary`: #16213e (Dark blue-grey)  
- `tertiary`: #1a2a4a (Slightly lighter)

#### Neon
- `cyan`: #00d9ff (Primary neon)
- `purple`: #7b2cbf (Secondary neon)
- `pink`: #ff006e (Danger neon)
- `green`: #06ffa5 (Success neon)
- `yellow`: #ffbe0b (Warning neon)

#### Entity
- `player`: #06ffa5 (Mint green hexagon)
- `playerGlow`: #00d9ff (Cyan glow)
- `enemy`: #ff006e (Hot pink orb)
- `enemyGlow`: #7b2cbf (Purple glow)

---

### 2. **Typography (Tipografi)**

#### Font Families
```typescript
primary: 'Arial, sans-serif'
bold: 'Arial Black, Arial, sans-serif'
mono: 'Courier New, Consolas, monospace'
```

#### Font Sizes
```typescript
xs: 12px
sm: 14px
base: 16px
lg: 20px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
5xl: 80px
huge: 120px
```

---

### 3. **Effects (Efektler)**

#### Glow
```typescript
low: { distance: 8, strength: 1.5 }
mid: { distance: 15, strength: 2.5 }
high: { distance: 20, strength: 3.0 }
```

#### Border Radius
```typescript
sm: 8px
md: 12px
lg: 16px
xl: 20px
```

#### Alpha Values
```typescript
transparent: 0
light: 0.1
medium: 0.3
heavy: 0.6
solid: 1.0
```

---

### 4. **Presets (Hazır Stiller)**

#### Button Presets

**Primary (Cyan border)**
```typescript
backgroundColor: 0x16213e
textColor: 0xffffff
borderColor: 0x00d9ff
fontSize: 22
borderRadius: 16
```

**Secondary (Purple border)**
```typescript
backgroundColor: 0x1a2a4a
textColor: 0x8b9dc3
borderColor: 0x7b2cbf
fontSize: 20
borderRadius: 12
```

**Danger (Pink border)**
```typescript
backgroundColor: 0x2d1b2e
textColor: 0xffffff
borderColor: 0xff006e
fontSize: 20
borderRadius: 12
```

**Success (Green border)**
```typescript
backgroundColor: 0x16213e
textColor: 0xffffff
borderColor: 0x06ffa5
fontSize: 20
borderRadius: 12
```

#### Text Presets

**Title**
```typescript
fontFamily: 'Arial Black'
fontSize: 120
fill: 0x0a0e27
stroke: { color: 0x00d9ff, width: 6 }
letterSpacing: 15
```

**Subtitle**
```typescript
fontFamily: 'Courier New, monospace'
fontSize: 20
fill: 0x8b9dc3
letterSpacing: 8
```

---

## 🎯 Uygulama Örnekleri

### Menü Sahnesi
```typescript
import { DesignSystem as DS } from '@utils/DesignSystem';

// Background gradient
const gradient = new FillGradient(0, 0, 0, GAME_HEIGHT);
gradient.addColorStop(0, DS.colors.background.primary);
gradient.addColorStop(1, DS.colors.background.secondary);

// Title text
const title = new Text({
  text: 'ZONA',
  style: DS.presets.text.title
});

// Button
const button = new Button({
  ...DS.presets.button.primary,
  text: 'START GAME',
  width: DS.sizes.button.lg.width,
  height: DS.sizes.button.lg.height,
});
```

### Entity Oluşturma
```typescript
// Player - Hexagon (mint green)
const size = DS.sizes.entity.player;
const color = DS.colors.entity.player;
const glowColor = DS.colors.entity.playerGlow;

// Enemy - Orb (hot pink)
const enemySize = DS.sizes.entity.enemy;
const enemyColor = DS.colors.entity.enemy;
const enemyGlow = DS.colors.entity.enemyGlow;
```

---

## 🔀 Theme Variations

### Ice Void
```typescript
primary: 0x00ffff (cyan)
secondary: 0x0080ff (deep blue)
enemy: 0xff4500 (orange-red)
```

### Toxic Void
```typescript
primary: 0x39ff14 (neon green)
secondary: 0xffff00 (electric yellow)
enemy: 0xff1493 (deep pink)
```

### Blood Void
```typescript
primary: 0xff0055 (hot pink)
secondary: 0x8b00ff (violet)
enemy: 0x00ffff (cyan - inverted)
```

---

## 📋 Best Practices

1. **Her zaman Design System kullan** - Hard-coded renkler kullanma
2. **Presetleri tercih et** - Tutarlılık için hazır stilleri kullan
3. **Yeni renkler eklerken** - Design System'e ekle, direkt kodlama
4. **Animasyonlar için** - `DS.animations.duration` değerlerini kullan
5. **Layout için** - `DS.layout` pozisyon değerlerini kullan

---

## 🎨 Renk Paleti (Hex)

```
Background
- #0a0e27 (Deep Void)
- #16213e (Dark Blue Grey)
- #1a2a4a (Lighter Grey)

Neon
- #00d9ff (Electric Cyan) ⚡
- #7b2cbf (Electric Purple) 💜
- #ff006e (Hot Pink) 🌸
- #06ffa5 (Mint Green) 🍃
- #ffbe0b (Electric Yellow) ⚠️

UI
- #ffffff (Pure White)
- #8b9dc3 (Muted Blue)
- #4a5568 (Dark Grey)
```

---

## 🚀 Gelecek Güncellemeler

- [ ] Particle system presets
- [ ] Animation easing functions
- [ ] Sound effect constants
- [ ] Power-up colors
- [ ] Level-specific color variations
- [ ] Mobile-specific sizing

---

**Made with 💙 for ZONA - NEON VOID**

