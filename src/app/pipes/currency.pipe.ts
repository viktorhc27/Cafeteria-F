import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'currencyChile'
})
export class CurrencyChilePipe implements PipeTransform {
  private decimalPipe = new DecimalPipe('es-CL');

  transform(value: number, symbolDisplay = true, digits?: string) {
    if (value == null) {
        return '';
    }
    value = Math.trunc(value);
    
    return this.decimalPipe.transform(value);

  }
}