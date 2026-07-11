import { MarketRow, SortColumn, SortDir } from "./markets-table/market-row.model";

type QuoteFilter = 'ALL' | 'USDT' | 'BTC' | 'ETH';

export function filterByTab(rows: MarketRow[], tab: QuoteFilter): MarketRow[] {
  if (tab === 'ALL') return rows;
  return rows.filter(r => r.quoteAsset === tab);
}

export function filterBySearch(rows: MarketRow[], query: string): MarketRow[] {
  const q = query.trim().toUpperCase();
  if (!q) return rows;
  return rows.filter(r => r.symbol.includes(q));
}

export function sortRows(rows: MarketRow[], column: SortColumn | null, dir: SortDir): MarketRow[] {
  if (!column || !dir) return rows;
  const direction = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => ((a[column] as number) - (b[column] as number)) * direction);
}