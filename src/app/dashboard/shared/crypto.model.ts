export interface CryptoToken {
  symbol: string;
  name: string;
  quoteAsset: string;
  price: number;
  priceDisplay: string;
  change24h: number;
  volume: number;
  isFavourite: boolean;
}