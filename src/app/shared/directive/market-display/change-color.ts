import { computed, Directive, input } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  host: {
    '[style.color]': 'color()',
  },
})
export class ChangeColor {
  value = input.required<number>({ alias: 'appChangeColor' });
  hasData = input<boolean>(true);

  protected color = computed(() => {
    if (!this.hasData()) return 'var(--text-secondary)';
    if (this.value() > 0) return 'var(--success)';
    if (this.value() < 0) return 'var(--danger)';
    return 'var(--text-secondary)';
  });
}
