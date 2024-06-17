import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskedNumber'
})
export class MaskedNumberPipe implements PipeTransform {
  transform(value: string): string {
    const visibleDigits = value.slice(-4); // Les quatre derniers chiffres visibles
    const maskedDigits = '*'.repeat(value.length - 4); // Les chiffres masqués

    return maskedDigits + visibleDigits;
  }
}
