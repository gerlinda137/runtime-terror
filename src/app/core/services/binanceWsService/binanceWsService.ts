import { Injectable } from "@angular/core";
import { Observable, share } from "rxjs";
import { DepthEvent, KlineEvent, Ticker } from "../../models";

const WS_BASE = 'wss://stream.testnet.binance.vision/ws';

@Injectable({providedIn:'root'})
export class BinanceWsService{

  //cache:prevents creating same Obsrvables if same stream is requisted
  private streams = new Map<string,Observable<unknown>>();

  //public api
  subscribeToTicker(symbol:string):Observable<Ticker>{
    return this.getOrCreate<Ticker>(`${symbol.toLowerCase()}@ticker`);
  }

  subscribeToKline(symbol:string,interval:string):Observable<KlineEvent>{
    return this.getOrCreate<KlineEvent>(`${symbol.toLowerCase()}@kline_${interval}`);
  }

  subscribeToDepth(symbol:string):Observable<DepthEvent>{
    return this.getOrCreate<DepthEvent>(`${symbol.toLowerCase()}@depth`);
  }

  subscribeToAllTickers():Observable<Ticker[]>{
    return this.getOrCreate<Ticker[]>('!ticker@arr');
  }

  //helpers

  //returns saved observable(in Map) for given stream name, or creates new one ,stores it in the Map and returns it
  private getOrCreate<T>(streamName:string):Observable<T>{
    if(!this.streams.has(streamName)){
      const url = `${WS_BASE}/${streamName}`;
      //share: makes sure ,that all subscribers reuse the same Websocket object instead of cretaing new one on every subscribtion 
      const obs$ = this.createStream<T>(url,streamName).pipe(share());
      this.streams.set(streamName,obs$);
    }
    return this.streams.get(streamName) as Observable<T>;
  }

  //opens websocket for given url,returns Observable stream of parsed data(JSON as T)
  //and closes ws after last subscriber unsubscribes
  private createStream<T>(url:string,streamName:string):Observable<T>{
    return new Observable<T>(observer=>{
      const ws = new WebSocket(url);

      ws.onmessage =(ev:MessageEvent)=>{
        observer.next(JSON.parse(ev.data) as T);
      }

      ws.onerror=()=>{
        observer.error(new Error(`Websocket error on ${url}`));
      }

      ws.onclose=()=>{
        observer.complete();
      }

      return ()=>{
        if(ws.readyState === WebSocket.OPEN){
          ws.close();
        }
        this.streams.delete(streamName);
      }
    })
  }

}