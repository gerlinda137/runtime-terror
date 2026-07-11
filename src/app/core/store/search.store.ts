import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SearchStore{
    readonly query = signal('');

    setQuery(val:string){
        this.query.set(val);
    }
}