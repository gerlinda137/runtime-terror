import type { CryptoToken } from '../models';

export const CRYPTO_TOKENS: CryptoToken[] = [
  {
    name: 'BNB',
    symbol: 'BNBUSDT',
    lastPrice: 41263,
    change24hour: 35.74,
  },
  {
    name: 'Bitcoin',
    symbol: 'BTCUSDT',
    lastPrice: 67450,
    change24hour: 2.31,
  },
  {
    name: 'Ethereum',
    symbol: 'ETHUSDT',
    lastPrice: 3521,
    change24hour: -1.87,
  },
  {
    name: 'Solana',
    symbol: 'SOLUSDT',
    lastPrice: 172,
    change24hour: 5.12,
  },
  {
    name: 'Cardano',
    symbol: 'ADAUSDT',
    lastPrice: 0.58,
    change24hour: -0.94,
  },
];
