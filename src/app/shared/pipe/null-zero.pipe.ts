import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null-zero'
})
export class NullToZeroPipe implements PipeTransform {

  transform(value: any): any {
    if(value == null){
        return 0;
      } else if( value == '') {
        return 0;
      } else if( value == 'undefined') {
        return 0;
      } else{
        return value;
      }
  }

}


