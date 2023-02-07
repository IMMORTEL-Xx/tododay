import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {
  
  transform(dateStart: Date, dateEnd: Date): string {
    dateStart = new Date(dateStart);
    dateEnd = new Date(dateEnd);

    let timeInMilliseconds = dateEnd.getTime() - dateStart.getTime();
    console.log(timeInMilliseconds)
    let timeInHoursMinutesSeconds = moment.utc(timeInMilliseconds).format('HH:mm:ss');
    return timeInHoursMinutesSeconds;
  }
}
