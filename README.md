# 🎮 ZONA

**ZONA** - PixiJS 8 ve TypeScript ile geliştirilmiş web tabanlı oyun.

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

### 3. Production Build

```bash
npm run build
```

Build dosyaları `dist/` klasörüne oluşturulur.

### 4. Build'i Preview Et

```bash
npm run preview
```

## 📁 Proje Yapısı

```
zona/
├── public/
│   └── assets/          # Görsel ve ses asset'leri
├── src/
│   ├── core/            # Ana uygulama ve sistem yönetimi
│   │   ├── Application.ts
│   │   ├── AssetLoader.ts
│   │   ├── GameLoop.ts
│   │   └── SceneManager.ts
│   ├── scenes/          # Oyun sahneleri
│   │   ├── BaseScene.ts
│   │   ├── MenuScene.ts
│   │   ├── GameScene.ts
│   │   └── GameOverScene.ts
│   ├── entities/        # Oyun entity'leri
│   │   ├── Entity.ts
│   │   ├── Player.ts
│   │   └── Enemy.ts
│   ├── systems/         # Oyun sistemleri
│   │   ├── InputSystem.ts
│   │   ├── CollisionSystem.ts
│   │   └── PhysicsSystem.ts
│   ├── ui/              # UI component'leri
│   │   ├── Button.ts
│   │   ├── HUD.ts
│   │   └── Menu.ts
│   ├── utils/           # Yardımcı fonksiyonlar
│   │   ├── Constants.ts
│   │   ├── Math.ts
│   │   └── Helpers.ts
│   ├── types/           # TypeScript type tanımları
│   │   └── index.ts
│   └── main.ts          # Entry point
└── ...
```

## 🎯 Özellikler

- ✅ **PixiJS 8**: Modern, performanslı 2D rendering
- ✅ **TypeScript**: Tip güvenliği ve modern JavaScript özellikleri
- ✅ **Vite**: Hızlı development ve build
- ✅ **Modüler Mimari**: Kolay genişletilebilir yapı
- ✅ **Scene Management**: Sahne geçişleri
- ✅ **Input System**: Klavye kontrolü
- ✅ **Collision Detection**: AABB çarpışma sistemi
- ✅ **Physics System**: Temel fizik simülasyonu

## 🎮 Kontroller

- **↑ ↓ ← →**: Hareket
- **ESC**: Menüye dön

## 📝 Geliştirme

### Yeni Sahne Ekleme

1. `src/scenes/` içinde yeni sahne dosyası oluştur
2. `BaseScene`'den türet
3. `SceneManager.ts`'de sahneyi kaydet

### Yeni Entity Ekleme

1. `src/entities/` içinde yeni entity dosyası oluştur
2. `Entity`'den türet
3. `createGraphics()` ve `update()` metodlarını implement et

### Asset Ekleme

1. Asset'i `public/assets/` klasörüne ekle
2. `AssetLoader.ts`'de manifest'e tanımla
3. Kodda `getAsset()` ile kullan

## 🛠️ Teknolojiler

- [PixiJS 8](https://pixijs.com/) - 2D WebGL renderer
- [TypeScript](https://www.typescriptlang.org/) - JavaScript superset
- [Vite](https://vitejs.dev/) - Build tool

## 📄 Lisans

MIT

---

**🎮 İyi oyunlar!**

