import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dots', pure: true })
export class DotsPipe implements PipeTransform {

  transform(value: string, lengthBeforeDots: number): any {
    return `${value && value.substr(0, lengthBeforeDots)}...`;
  }

}
