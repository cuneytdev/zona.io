# ZONA Assets

Bu klasörde oyununuzun görsel ve ses asset'lerini saklayabilirsiniz.

## Klasör Yapısı

- **images/**: Sprite'lar, texture'lar ve görsel asset'ler
- **sounds/**: Ses efektleri ve müzik dosyaları
- **fonts/**: Özel font dosyaları

## Kullanım

Asset'leri `AssetLoader.ts` içinde tanımlayın:

```typescript
private manifest: AssetManifest = {
  'player': '/assets/images/player.png',
  'enemy': '/assets/images/enemy.png',
  'background': '/assets/images/background.png',
};
```

Daha sonra oyunda kullanın:

```typescript
const texture = this.assetLoader.getAsset('player');
```

