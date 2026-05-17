import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbol',
})
export class SymbolPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('USDT', '');
  }
}
