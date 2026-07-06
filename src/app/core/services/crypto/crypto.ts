import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

export interface OrderPayload {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  quantity: string;
  price?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Crypto {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  //account balance
  // eslint-disable-next-line
  getAccount(keyId: string): Observable<any> {
    return this.http.get(`${this.base}/crypto/account`, {
      params: { keyId },
    });
  }

  //current pair price
  // eslint-disable-next-line
  getTicker(symbol: string): Observable<any> {
    return this.http.get(`${this.base}/crypto/ticker`, { params: { symbol } });
  }

  getAllPrices(): Observable<{ symbol: string; price: string }[]> {
    return this.http.get<{ symbol: string; price: string }[]>(`${this.base}/crypto/ticker`);
  }

  //create order
  // eslint-disable-next-line
  createOrder(keyId: string, payload: OrderPayload): Observable<any> {
    return this.http.post(`${this.base}/crypto/order`, payload, { params: { keyId } });
  }
}
