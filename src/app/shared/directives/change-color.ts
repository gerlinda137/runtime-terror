import { computed, Directive, input } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  host: {
    '[style.color]': 'color()',
  },
})
export class ChangeColorDirective {
  value = input.required<number>({ alias: 'appChangeColor' });

  protected color = computed(() => (this.value() >= 0 ? 'var(--success-alt)' : 'var(--danger)'));
}
