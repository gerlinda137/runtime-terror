import { TestBed } from '@angular/core/testing';
import { BinanceWsService } from './binanceWsService';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Ticker } from '../../models';

interface FakeWebSocketInstance {
  url: string;
  readyState: number;
  close: ReturnType<typeof vi.fn>;
  onmessage: ((ev: { data: string }) => void) | null;
  onerror: (() => void) | null;
  onclose: (() => void) | null;
}

describe('BinanceWsService', () => {
  const TEST_SYMBOL = 'BTCUSDT';
  let service: BinanceWsService;
  let wsConstructorCallCount: number;
  let lastFakeSocket: FakeWebSocketInstance;

  beforeEach(() => {
    wsConstructorCallCount = 0;

    function createFakeWebSocket(url: string): FakeWebSocketInstance {
      wsConstructorCallCount++;
      const socket: FakeWebSocketInstance = {
        url,
        readyState: createFakeWebSocket.OPEN,
        close:  vi.fn(),
        onmessage: null,
        onerror: null,
        onclose: null,
      };
      lastFakeSocket = socket;
      return socket;
    }

    createFakeWebSocket.OPEN = 1;
    createFakeWebSocket.CONNECTING = 0;
    createFakeWebSocket.CLOSING = 2;
    createFakeWebSocket.CLOSED = 3;

    vi.stubGlobal('WebSocket', createFakeWebSocket);

    TestBed.configureTestingModule({});
    service = TestBed.inject(BinanceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shold only open one websocket for two subscriptions to the same stream', () => {
    const sub1 = service.subscribeToTicker(TEST_SYMBOL).subscribe();
    const sub2 = service.subscribeToTicker(TEST_SYMBOL).subscribe();

    expect(wsConstructorCallCount).toBe(1);

    sub1.unsubscribe();
    sub2.unsubscribe();
  });

  it('should open seperate websockets for different streams', () => {
    service.subscribeToTicker(TEST_SYMBOL).subscribe();
    service.subscribeToKline(TEST_SYMBOL, '1m').subscribe();

    expect(wsConstructorCallCount).toBe(2);
  });

  it('should deliver same msg to multiple subscribrs of same stream', () => {
    const received: string[] = [];

    service.subscribeToTicker(TEST_SYMBOL).subscribe((msg:Ticker) => received.push('A:' + (msg as any).s));
    service.subscribeToTicker(TEST_SYMBOL).subscribe((msg:Ticker) => received.push('B:' + (msg as any).s));

    lastFakeSocket.onmessage?.({ data: JSON.stringify({ s: TEST_SYMBOL }) });

    expect(received).toEqual([`A:${TEST_SYMBOL}`, `B:${TEST_SYMBOL}`]);
  });

  it('should close the real ws when the last subscriber unsubscribes', () => {
    const sub1 = service.subscribeToTicker(TEST_SYMBOL).subscribe();
    const sub2 = service.subscribeToTicker(TEST_SYMBOL).subscribe();

    sub1.unsubscribe();
    expect(lastFakeSocket.close).not.toHaveBeenCalled();

    sub2.unsubscribe();
    expect(lastFakeSocket.close).toHaveBeenCalled();
  });
});
