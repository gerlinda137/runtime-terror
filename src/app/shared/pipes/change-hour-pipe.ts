import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeHour',
})
export class ChangeHourPipe implements PipeTransform {
  transform(value: number): string {
    value.toFixed(2);
    return value > 0 ? `+${value}%` : `${value}%`;
  }
}
