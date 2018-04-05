import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null-quote'
})
export class NullToQuotePipe implements PipeTransform {

  transform(value: string): string {
    if(value == null ) {
        return '';
      } else {
        return value;
      }

  }

}


