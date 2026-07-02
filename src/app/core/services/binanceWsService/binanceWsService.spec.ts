import { TestBed } from '@angular/core/testing';
import { BinanceWsService } from './binanceWsService';

describe('BinanceWsService', () => {
  const TEST_SYMBOL = 'BTCUSDT';
  let service: BinanceWsService;
  let wsConstructorCallCount: number;
  let lastFakeSocket: any;

  beforeEach(() => {
    wsConstructorCallCount = 0;

    class FakeWebSocket {
      static OPEN = 1;
      readyState = FakeWebSocket.OPEN;
      close = vi.fn();
      onmessage: ((ev: any) => void) | null = null;
      onerror: (() => void) | null = null;
      onclose: (() => void) | null = null;

      constructor(_url: string) {
        wsConstructorCallCount++;
        lastFakeSocket = this;
      }
    }

    vi.stubGlobal('WebSocket', FakeWebSocket);

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

    service.subscribeToTicker(TEST_SYMBOL).subscribe((msg) => received.push('A:' + (msg as any).s));
    service.subscribeToTicker(TEST_SYMBOL).subscribe((msg) => received.push('B:' + (msg as any).s));

    lastFakeSocket.onmessage({ data: JSON.stringify({ s: TEST_SYMBOL }) });

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
