import { signal } from '@angular/core';

const FLASH_DURATION = 600;

export interface PriceFlashable {
  symbol: string;
  price: number;
}

export function createPriceFlash<T extends PriceFlashable>() {
  const flashingSymbolsSignal = signal<Set<string>>(new Set());
  const prevPrices = new Map<string, number>();

  function detect(rows: T[]): void {
    const changed: string[] = [];

    rows.forEach((row) => {
      const prev = prevPrices.get(row.symbol);

      if (prev !== undefined && prev !== row.price) {
        changed.push(row.symbol);
      }
      prevPrices.set(row.symbol, row.price);
    });

    if (changed.length === 0) return;

    flashingSymbolsSignal.update((set) => {
      const next = new Set(set);
      changed.forEach((s) => next.add(s));
      return next;
    });

    changed.forEach((s) => {
      setTimeout(() => {
        flashingSymbolsSignal.update((set) => {
          const next = new Set(set);
          next.delete(s);
          return next;
        });
      }, FLASH_DURATION);
    });
  }

  return {
    flashingSymbols: flashingSymbolsSignal.asReadonly(),
    detect,
  };
}
