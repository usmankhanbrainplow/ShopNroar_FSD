import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceilingPrice'
})
export class CeilingPricePipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {number}
   */
  transform(value: number): number {
    return Math.ceil(value);
  }

}
