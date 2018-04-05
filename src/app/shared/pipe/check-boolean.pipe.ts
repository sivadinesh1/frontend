import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'check-boolean'
})
export class CheckBooleanPipe implements PipeTransform {

  transform(value: string): boolean {

    if(value === 'Y') {
        return true;
      } else if (value === 'N') {
        return false;
      }
      

 
  }

}


