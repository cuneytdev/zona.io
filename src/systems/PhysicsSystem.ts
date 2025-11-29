import type { Entity } from '@entities/Entity';
import { GRAVITY, MAX_VELOCITY } from '@utils/Constants';
import { clamp } from '@utils/Math';

/**
 * Fizik simülasyon sistemi
 * Hız, ivme ve yerçekimi hesaplamaları
 */
export class PhysicsSystem {
  private gravity: number;

  constructor(gravity: number = GRAVITY) {
    this.gravity = gravity;
  }

  /**
   * Yerçekimi uygula
   */
  public applyGravity(entity: Entity, deltaTime: number): void {
    // @ts-ignore - Entity'de velocity protected
    entity.velocity.y += this.gravity * (deltaTime / 16);
    // @ts-ignore
    entity.velocity.y = clamp(entity.velocity.y, -MAX_VELOCITY, MAX_VELOCITY);
  }

  /**
   * Hızı uygula
   */
  public applyVelocity(entity: Entity, deltaTime: number): void {
    // @ts-ignore - Entity'de velocity protected
    entity.x += entity.velocity.x * (deltaTime / 16);
    // @ts-ignore
    entity.y += entity.velocity.y * (deltaTime / 16);
  }

  /**
   * Sürtünme uygula
   */
  public applyFriction(entity: Entity, friction: number = 0.9): void {
    // @ts-ignore
    entity.velocity.x *= friction;
    // @ts-ignore
    entity.velocity.y *= friction;
  }

  /**
   * İvme ekle
   */
  public addForce(
    entity: Entity,
    forceX: number,
    forceY: number
  ): void {
    // @ts-ignore
    entity.velocity.x += forceX;
    // @ts-ignore
    entity.velocity.y += forceY;
  }
}

