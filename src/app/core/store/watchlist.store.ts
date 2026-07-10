import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

const STORAGE_KEY = 'crypto_watchlist';


@Injectable({
    providedIn: 'root'
})
export class WatchlistStore {
    // In-memory watchlist, initialized from localStorage on startup
    private symbols = new BehaviorSubject<Set<string>>(this.loadFromStorage());

    // Full watchlist as a stream, for components that need to react to any change
    readonly watchlist$: Observable<Set<string>> = this.symbols.asObservable();

    // One-time synchronous read of the whole watchlist
    get snapshot(): Set<string> {
        return this.symbols.value;
    }

    // Reactive check for one symbol, use in templates with | async
    isFav$(symbol: string): Observable<boolean> {
        return this.watchlist$.pipe(map(set => set.has(symbol)));
    }

    // One-time synchronous check for one symbol
    isFav(symbol: string): boolean {
        return this.symbols.value.has(symbol);
    }

    // Adds/removes a symbol
    toggle(symbol: string): void {
        const next = new Set(this.symbols.value);
        if (next.has(symbol)) {
            next.delete(symbol);
        } else {
            next.add(symbol);
        }
        this.symbols.next(next);
        this.saveToStorage(next);
    }

    // Reads saved watchlist from localStorage, empty Set if none/corrupted
    private loadFromStorage(): Set<string> {
        try {
            const row = localStorage.getItem(STORAGE_KEY);
            return row ? new Set(JSON.parse(row)) : new Set<string>();
        } catch (e) {
            console.error('Failed to load watchlist from storage', e);
            return new Set<string>();
        }
    }

    // Saves the watchlist to localStorage so it persists across sessions
    private saveToStorage(set: Set<string>) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set))
        );
    }

}