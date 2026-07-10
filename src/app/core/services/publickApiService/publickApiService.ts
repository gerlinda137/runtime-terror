import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { ExchangeInfo, KLinesResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class PublicApi {
  private http = inject(HttpClient);
  // use apiUrl from environment (e.g. https://testnet.binance.vision/api)
  private base = environment.publicApiUrl;
  private api = environment.apiUrl;

  // GET /api/v3/exchangeInfo
  getExchangeInfo(): Observable<ExchangeInfo> {
    return this.http.get<ExchangeInfo>(`${this.base}/v3/exchangeInfo`);
  }

  // GET /api/v3/ticker/price?symbol=BTCUSDT
  getTickerPrice(symbol: string) {
    return this.http.get(`${this.base}/v3/ticker/price`, {
      params: { symbol },
    });
  }

  // GET /api/v3/depth?symbol=BTCUSDT&limit=100
  getOrderBook(symbol: string, limit = 100) {
    return this.http.get(`${this.base}/v3/depth`, {
      params: { symbol, limit },
    });
  }

  // GET /api/v3/klines?symbol=BTCUSDT&interval=1m&limit=500
  getKLines(symbol: string): Observable<KLinesResponse> {
    return this.http.get<KLinesResponse>(`${this.api}/crypto/klines`, {
      params: { symbol },
    });
  }

  // GET /api/v3/trades?symbol=BTCUSDT&limit=50
  getRecentTrades(symbol: string, limit = 50) {
    return this.http.get(`${this.base}/v3/trades`, {
      params: { symbol, limit },
    });
  }
}
