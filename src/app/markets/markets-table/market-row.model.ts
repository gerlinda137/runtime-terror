export interface MarketRow {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    price: number;
    priceDisplay: string;
    change24h: number;
    volume24h: number;
    isFavourite: boolean;
}


export type SortColumn = 'price' | 'change24h' | 'volume24h';
export type SortDir = 'asc' | 'desc' | null;