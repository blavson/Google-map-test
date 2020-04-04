import { PipeTransform, Pipe } from '@angular/core';

const paraLength = 80;

@Pipe ({name : 'list80'})
export class CustomPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (value.length > paraLength )
      return value.substr(1,80) + '...';
    else
      return value + '...';  
  }

}