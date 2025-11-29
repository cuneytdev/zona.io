import type { Entity } from '@entities/Entity';

/**
 * Çarpışma kontrol sistemi
 * AABB (Axis-Aligned Bounding Box) collision detection
 */
export class CollisionSystem {
  /**
   * İki entity arasında çarpışma var mı kontrol et
   */
  public checkCollision(entity1: Entity, entity2: Entity): boolean {
    const bounds1 = entity1.getBounds();
    const bounds2 = entity2.getBounds();

    return this.aabbCollision(
      bounds1.x, bounds1.y, bounds1.width, bounds1.height,
      bounds2.x, bounds2.y, bounds2.width, bounds2.height
    );
  }

  /**
   * AABB çarpışma kontrolü
   */
  private aabbCollision(
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean {
    return (
      x1 < x2 + w2 &&
      x1 + w1 > x2 &&
      y1 < y2 + h2 &&
      y1 + h1 > y2
    );
  }

  /**
   * Nokta içinde mi kontrol et
   */
  public pointInBounds(
    x: number, y: number,
    bounds: { x: number; y: number; width: number; height: number }
  ): boolean {
    return (
      x >= bounds.x &&
      x <= bounds.x + bounds.width &&
      y >= bounds.y &&
      y <= bounds.y + bounds.height
    );
  }
}

