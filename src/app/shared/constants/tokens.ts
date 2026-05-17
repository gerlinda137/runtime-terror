import type { ICryptoToken } from '../../models';

export const CRYPTO_TOKENS: ICryptoToken[] = [
  {
    icon: 'assets/icons/bnb.svg',
    name: 'BNB',
    symbol: 'BNBUSDT',
    lastPrice: 41263,
    change24hour: 35.74,
  },
  {
    icon: 'assets/icons/btc.svg',
    name: 'Bitcoin',
    symbol: 'BTCUSDT',
    lastPrice: 67450,
    change24hour: 2.31,
  },
  {
    icon: 'assets/icons/eth.svg',
    name: 'Ethereum',
    symbol: 'ETHUSDT',
    lastPrice: 3521,
    change24hour: -1.87,
  },
  {
    icon: 'assets/icons/sol.svg',
    name: 'Solana',
    symbol: 'SOLUSDT',
    lastPrice: 172,
    change24hour: 5.12,
  },
  {
    icon: 'assets/icons/ada.svg',
    name: 'Cardano',
    symbol: 'ADAUSDT',
    lastPrice: 0.58,
    change24hour: -0.94,
  },
];
