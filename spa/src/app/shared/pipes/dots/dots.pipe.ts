import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dots', pure: true })
export class DotsPipe implements PipeTransform {

  transform(value: string, lengthBeforeDots: number): any {
    const safeValue = value || '';
    return safeValue.length <= lengthBeforeDots ?
      safeValue :
      `${safeValue.substr(0, lengthBeforeDots)}...`;
  }

}
