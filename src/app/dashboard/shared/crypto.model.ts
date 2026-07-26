export interface CryptoToken {
  symbol: string;
  name: string;
  price: number;
  priceDisplay: string;
  change24h: number;
  volume: number;
  isFavourite: boolean;
}