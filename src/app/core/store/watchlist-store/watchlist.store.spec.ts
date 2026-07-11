import { TestBed } from '@angular/core/testing';
import { WatchlistStore } from './watchlist.store';
const STORAGE_KEY = 'crypto_watchlist';

describe('WatchlistStore', () => {
  let store: WatchlistStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(WatchlistStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should start empty when nothing is saved', () => {
    expect(store.snapshot.size).toBe(0);
  });

  it('toggle should add a symbol not yet in the watchlist', () => {
    store.toggle('BTCUSDT');
    expect(store.snapshot.has('BTCUSDT')).toBe(true);
  });

  it('toggle should remove a symbol already in the watchlist', () => {
    store.toggle('BTCUSDT');
    store.toggle('BTCUSDT');
    expect(store.snapshot.has('BTCUSDT')).toBe(false);
  });

  it('toggle should persist to localStorage', () => {
    store.toggle('ETHUSDT');
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!)).toEqual(['ETHUSDT']);
  });

  it('should load a previously saved watchlist on construction', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['BTCUSDT', 'ETHUSDT']));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshStore = TestBed.inject(WatchlistStore);

    expect(freshStore.snapshot.has('BTCUSDT')).toBe(true);
    expect(freshStore.snapshot.has('ETHUSDT')).toBe(true);
  });

  it('should fall back to empty if localStorage data is corrupted', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshStore = TestBed.inject(WatchlistStore);

    expect(freshStore.snapshot.size).toBe(0);
  });

  it('isFav should reflect current state synchronously', () => {
    expect(store.isFav('BTCUSDT')).toBe(false);
    store.toggle('BTCUSDT');
    expect(store.isFav('BTCUSDT')).toBe(true);
  });

  it('isFav$ should emit as the watchlist changes', () => {
    const emissions: boolean[] = [];
    store.isFav$('BTCUSDT').subscribe((v) => emissions.push(v));

    store.toggle('BTCUSDT');
    store.toggle('BTCUSDT');

    expect(emissions).toEqual([false, true, false]);
  });

  it('watchlist$ should emit a new Set on every toggle', () => {
    const emissions: Set<string>[] = [];
    store.watchlist$.subscribe((v) => emissions.push(v));

    store.toggle('BTCUSDT');
    store.toggle('ETHUSDT');

    expect(emissions.length).toBe(3);
    expect(emissions[2].has('BTCUSDT')).toBe(true);
    expect(emissions[2].has('ETHUSDT')).toBe(true);
  });
});
