import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let result = '';
    let hours = Math.floor(value/10000).toString();
    let minutes = Math.floor((value/100)%100).toString();
    let seconds = Math.floor(value%100).toString();

    if (hours.length == 1){
      hours = '0' + hours;
    }

    if (minutes.length == 1){
      minutes = '0' + minutes;
    }

    if (seconds.length == 1){
      seconds = '0' + seconds;
    }
    
    result = hours + ':' + minutes + ':' + seconds;
    return result;

  }
}
