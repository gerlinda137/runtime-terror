export interface MarketAsset {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  price: number;
  priceDisplay: string;
  change24h: number;
  volume: number;
  isFavourite: boolean;
  hasLiveData:boolean;
}