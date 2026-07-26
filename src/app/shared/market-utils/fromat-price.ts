export function formatPrice(price: number, quote: string): string {
  return quote === 'BTC' ? price.toFixed(8) : price.toFixed(2);
}
