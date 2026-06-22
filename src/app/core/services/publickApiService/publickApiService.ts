import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PublicApiService {
  private http = inject(HttpClient);
  private base = environment.apiPublic; // https://testnet.binance.vision/api

  // GET /api/v3/exchangeInfo
  getExchangeInfo() {
    return this.http.get(`${this.base}/v3/exchangeInfo`);
  }

  // GET /api/v3/ticker/price?symbol=BTCUSDT
  getTickerPrice(symbol: string) {
    return this.http.get(`${this.base}/v3/ticker/price`, {
      params: { symbol }
    });
  }

  // GET /api/v3/depth?symbol=BTCUSDT&limit=100
  getOrderBook(symbol: string, limit = 100) {
    return this.http.get(`${this.base}/v3/depth`, {
      params: { symbol, limit }
    });
  }

  // GET /api/v3/klines?symbol=BTCUSDT&interval=1m&limit=500
  getKlines(symbol: string, interval = '1m', limit = 500) {
    return this.http.get(`${this.base}/v3/klines`, {
      params: { symbol, interval, limit }
    });
  }

  // GET /api/v3/trades?symbol=BTCUSDT&limit=50
  getRecentTrades(symbol: string, limit = 50) {
    return this.http.get(`${this.base}/v3/trades`, {
      params: { symbol, limit }
    });
  }
}
