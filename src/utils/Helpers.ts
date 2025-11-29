/**
 * FPS hesaplayıcı
 */
export function calculateFPS(deltaTime: number): number {
  return Math.round(1000 / deltaTime);
}

/**
 * Nesne deep clone
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Rastgele ID oluştur
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Delay promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

