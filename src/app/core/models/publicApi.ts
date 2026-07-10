// REST API: klines endpoint returns an array of tuples
export type Kline = [
  number, // open time
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  number, // close time
  string, // quote asset volume
  number, // number of trades
  string, // taker buy base asset volume
  string, // taker buy quote asset volume
  string  // ignore
];

export type KLinesResponse = Kline[];

// REST: GET /v3/exchangeInfo — one symbol entry
export interface SymbolInfo {
  symbol: string;        // e.g. "BTCUSDT"
  status: string;        // "TRADING" | "BREAK" | etc.
  baseAsset: string;     // e.g. "BTC"
  quoteAsset: string;    // e.g. "USDT"
}

// REST: GET /v3/exchangeInfo — full response
export interface ExchangeInfo {
  symbols: SymbolInfo[];
}


// WebSocket: Individual symbol ticker stream (<symbol>@ticker)
export interface Ticker {
  e: string;   // event type
  E: number;   // event time
  s: string;   // symbol
  p: string;   // price change
  P: string;   // price change percent
  w: string;   // weighted average price
  c: string;   // last price
  Q: string;   // last quantity
  o: string;   // open price
  h: string;   // high price
  l: string;   // low price
  v: string;   // total traded base asset volume
  q: string;   // total traded quote asset volume
  O: number;   // statistics open time
  C: number;   // statistics close time
  F: number;   // first trade ID
  L: number;   // last trade ID
  n: number;   // total number of trades
};

// WebSocket: Kline object nested inside KlineEvent
export interface BinanceKline {
  t: number;   // kline start time
  T: number;   // kline close time
  s: string;   // symbol
  i: string;   // interval
  f: number;   // first trade ID
  L: number;   // last trade ID
  o: string;   // open price
  c: string;   // close price
  h: string;   // high price
  l: string;   // low price
  v: string;   // base asset volume
  n: number;   // number of trades
  x: boolean;  // is this kline closed?
  q: string;   // quote asset volume
  V: string;   // taker buy base asset volume
  Q: string;   // taker buy quote asset volume
};

// WebSocket: Kline stream event (<symbol>@kline_<interval>)
export interface KlineEvent {
  e: string;      // event type ("kline")
  E: number;      // event time
  s: string;      // symbol
  k: BinanceKline;
};

// WebSocket: Diff. depth stream event (<symbol>@depth)
export interface DepthEvent {
  e: string;       // event type ("depthUpdate")
  E: number;       // event time
  s: string;       // symbol
  U: number;       // first update ID in event
  u: number;       // final update ID in event
  b: [string, string][]; // bids: [price, quantity]
  a: [string, string][]; // asks: [price, quantity]
};
